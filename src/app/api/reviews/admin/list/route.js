import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function GET(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const offset = (page - 1) * pageSize
    const search = searchParams.get('search') || ''

    let query = supabase.from('reviews').select('*', { count: 'exact' })

    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,title.ilike.%${search}%,content.ilike.%${search}%`)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    return NextResponse.json({
      reviews: data || [],
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (err) {
    console.error('Admin list error:', err)
    return NextResponse.json({ error: '获取评价列表失败' }, { status: 500 })
  }
}
