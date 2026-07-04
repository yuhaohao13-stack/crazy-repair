import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const offset = (page - 1) * pageSize

    // 获取总数
    const { count, error: countError } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })

    if (countError) throw countError

    // 获取当前页评价（手机号脱敏）
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    // 手机号脱敏：138****5678
    const masked = (data || []).map(r => ({
      ...r,
      phone: r.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    }))

    // 获取轮播用（最新5条）
    const { data: carousel } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    const carouselMasked = (carousel || []).map(r => ({
      ...r,
      phone: r.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    }))

    return NextResponse.json({
      reviews: masked,
      carousel: carouselMasked,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (err) {
    console.error('List reviews error:', err)
    return NextResponse.json({ error: '获取评价失败' }, { status: 500 })
  }
}
