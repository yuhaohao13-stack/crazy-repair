import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const reviewId = searchParams.get('reviewId')

    // 如果指定了 reviewId，返回单条评价详情
    if (reviewId) {
      const { data: review, error: reviewError } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', reviewId)
        .single()

      if (reviewError || !review) {
        return NextResponse.json({ error: '评价不存在' }, { status: 404 })
      }

      // 手机号脱敏
      const masked = {
        ...review,
        phone: review.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
      }

      // 获取所有回复
      const { data: replies } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (id, username, is_admin)
        `)
        .eq('target_type', 'review')
        .eq('target_id', reviewId)
        .is('parent_id', null)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })

      return NextResponse.json({
        review: masked,
        replies: replies || [],
      })
    }

    // 列表模式
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const offset = (page - 1) * pageSize

    const { count, error: countError } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })

    if (countError) throw countError

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) throw error

    // 手机号脱敏
    const masked = (data || []).map(r => ({
      ...r,
      phone: r.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    }))

    // 获取所有评价的回复（最多2条预览）
    const reviewIds = (data || []).map(r => r.id)
    let repliesMap = {}
    let countMap = {}

    if (reviewIds.length > 0) {
      const { data: allReplies } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (id, username, is_admin)
        `)
        .eq('target_type', 'review')
        .in('target_id', reviewIds)
        .is('parent_id', null)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })

      if (allReplies) {
        allReplies.forEach(r => {
          const key = r.target_id
          if (!repliesMap[key]) repliesMap[key] = []
          if (repliesMap[key].length < 2) {
            repliesMap[key].push(r)
          }
          countMap[key] = (countMap[key] || 0) + 1
        })
      }
    }

    const reviewsWithReplies = masked.map(r => ({
      ...r,
      replies: repliesMap[r.id] || [],
      replyCount: countMap[r.id] || 0,
    }))

    // 带回复的轮播
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
      reviews: reviewsWithReplies,
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
