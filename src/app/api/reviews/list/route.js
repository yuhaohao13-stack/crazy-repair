import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const reviewId = searchParams.get('reviewId')

    // 如果指定了 reviewId，返回单条评价详情
    if (reviewId) {
      const [reviewRes, repliesRes] = await Promise.all([
        supabase.from('reviews').select('id,name,phone,title,content,rating,images,user_id,created_at').eq('id', reviewId).single(),
        supabase.from('messages').select('id,user_id,content,images,is_pinned,is_admin_reply,created_at').eq('target_type', 'review').eq('target_id', reviewId).is('parent_id', null).order('is_pinned', { ascending: false }).order('created_at', { ascending: true }),
      ])

      if (reviewRes.error || !reviewRes.data) {
        return NextResponse.json({ error: '评价不存在' }, { status: 404 })
      }

      const review = reviewRes.data
      const allReplies = repliesRes.data || []

      // 获取用户数据
      const userIds = new Set()
      if (review.user_id) userIds.add(review.user_id)
      allReplies.forEach(r => { if (r.user_id) userIds.add(r.user_id) })

      let usersMap = {}
      if (userIds.size > 0) {
        const { data: users } = await supabase.from('users').select('id,username,is_admin').in('id', [...userIds])
        if (users) users.forEach(u => { usersMap[u.id] = u })
      }

      const maskPhone = (p) => p?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || p

      return NextResponse.json({
        review: { ...review, phone: maskPhone(review.phone), user: usersMap[review.user_id] || null },
        replies: allReplies.map(r => ({ ...r, user: usersMap[r.user_id] || null })),
      })
    }

    // 列表模式
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const offset = (page - 1) * pageSize

    // 并行查询
    const fields = 'id,name,phone,title,content,rating,images,user_id,created_at'

    const [reviewsRes, countRes, repliesRes, carouselRes] = await Promise.all([
      supabase.from('reviews').select(fields).order('created_at', { ascending: false }).range(offset, offset + pageSize - 1),
      supabase.from('reviews').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id,user_id,content,images,is_pinned,is_admin_reply,created_at,target_id,user:user_id(id,username,is_admin)').eq('target_type', 'review').is('parent_id', null).order('is_pinned', { ascending: false }).order('created_at', { ascending: true }),
      supabase.from('reviews').select(fields).order('created_at', { ascending: false }).limit(5),
    ])

    if (reviewsRes.error) throw reviewsRes.error

    const reviews = reviewsRes.data || []
    const allReplies = repliesRes.data || []
    const carousel = carouselRes.data || []
    const total = countRes.count || 0

    // 手机号脱敏
    const maskPhone = (p) => p?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || p

    // 组装回复预览
    const reviewIds = reviews.map(r => r.id)
    const repliesMap = {}
    const countMap = {}

    allReplies.forEach(r => {
      const key = r.target_id
      countMap[key] = (countMap[key] || 0) + 1
      if (!repliesMap[key]) repliesMap[key] = []
      if (repliesMap[key].length < 2) {
        repliesMap[key].push(r)
      }
    })

    const reviewsWithReplies = reviews.map(r => ({
      ...r,
      phone: maskPhone(r.phone),
      replies: repliesMap[r.id] || [],
      replyCount: countMap[r.id] || 0,
    }))

    const carouselMasked = (carousel || []).map(r => ({
      ...r,
      phone: maskPhone(r.phone),
    }))

    return NextResponse.json({
      reviews: reviewsWithReplies,
      carousel: carouselMasked,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (err) {
    console.error('List reviews error:', err)
    return NextResponse.json({ error: '获取评价失败' }, { status: 500 })
  }
}
