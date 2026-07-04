import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function POST(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: '缺少评价ID' }, { status: 400 })
    }

    // 先获取评价图片URL，删除存储中的图片
    const { data: review } = await supabase
      .from('reviews')
      .select('images')
      .eq('id', id)
      .single()

    // 删除存储中的图片
    if (review?.images?.length > 0) {
      for (const url of review.images) {
        const path = url.split('/').slice(-2).join('/')
        await supabase.storage.from('review-images').remove([path])
      }
    }

    // 删除评价
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Admin delete error:', err)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
