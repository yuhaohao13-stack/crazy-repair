import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { getUserFromRequest } from '@/lib/auth'

// 获取留言列表（可指定单个留言详情）
export async function GET(req) {
  try {
    const url = new URL(req.url)
    const messageId = url.searchParams.get('messageId')
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20')

    // 如果指定了 messageId，返回单条留言详情
    if (messageId) {
      const { data: message, error: msgError } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (id, username, is_admin)
        `)
        .eq('id', messageId)
        .single()

      if (msgError || !message) {
        return NextResponse.json({ error: '留言不存在' }, { status: 404 })
      }

      // 获取所有回复
      const { data: replies } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (id, username, is_admin)
        `)
        .eq('parent_id', messageId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })

      return NextResponse.json({
        message,
        replies: replies || [],
      })
    }

    // 分页获取留言列表
    const offset = (page - 1) * pageSize

    // 获取置顶留言 + 普通留言（分页）
    const { data: pinnedData, error: pinnedError } = await supabase
      .from('messages')
      .select(`
        *,
        user:user_id (id, username, is_admin)
      `)
      .is('parent_id', null)
      .eq('is_pinned', true)
      .eq('target_type', 'message')
      .order('created_at', { ascending: false })

    if (pinnedError) throw pinnedError

    const { data: messagesData, error: messagesError, count } = await supabase
      .from('messages')
      .select(`
        *,
        user:user_id (id, username, is_admin)
      `, { count: 'exact' })
      .is('parent_id', null)
      .eq('target_type', 'message')
      .eq('is_pinned', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (messagesError) throw messagesError

    // 获取所有留言的回复（只取前2条做预览）
    const parentIds = [...(pinnedData || []).map(m => m.id), ...(messagesData || []).map(m => m.id)]
    let replies = []
    if (parentIds.length > 0) {
      const { data: repliesData } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (id, username, is_admin)
        `)
        .in('parent_id', parentIds)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })

      if (repliesData) replies = repliesData
    }

    // 每条留言最多取2条回复
    const repliesMap = {}
    replies.forEach(r => {
      if (!repliesMap[r.parent_id]) repliesMap[r.parent_id] = []
      if (repliesMap[r.parent_id].length < 2) {
        repliesMap[r.parent_id].push(r)
      }
    })

    // 统计每条留言的回复总数
    const { data: replyCounts } = await supabase
      .from('messages')
      .select('parent_id')
      .in('parent_id', parentIds)

    const countMap = {}
    if (replyCounts) {
      replyCounts.forEach(r => {
        countMap[r.parent_id] = (countMap[r.parent_id] || 0) + 1
      })
    }

    const pinMessages = (pinnedData || []).map(m => ({
      ...m,
      replies: repliesMap[m.id] || [],
      replyCount: countMap[m.id] || 0,
    }))
    const pageMessages = (messagesData || []).map(m => ({
      ...m,
      replies: repliesMap[m.id] || [],
      replyCount: countMap[m.id] || 0,
    }))

    return NextResponse.json({
      pinned: pinMessages,
      messages: pageMessages,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (err) {
    console.error('Get messages error:', err)
    return NextResponse.json({ error: '获取留言失败' }, { status: 500 })
  }
}

// 发表留言
export async function POST(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, images, captchaId, captchaValue } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入留言内容' }, { status: 400 })
    }

    // 验证码
    if (!captchaId || !captchaValue) {
      return NextResponse.json({ error: '请完成验证码' }, { status: 400 })
    }

    const { data: captcha, error: captchaError } = await supabase
      .from('captchas')
      .select('*')
      .eq('id', captchaId)
      .single()

    if (captchaError || !captcha) {
      return NextResponse.json({ error: '验证码无效，请刷新重试' }, { status: 400 })
    }

    if (new Date(captcha.expires_at) < new Date()) {
      await supabase.from('captchas').delete().eq('id', captchaId)
      return NextResponse.json({ error: '验证码已过期，请刷新重试' }, { status: 400 })
    }

    if (captcha.code !== captchaValue.trim()) {
      return NextResponse.json({ error: '验证码错误' }, { status: 400 })
    }

    await supabase.from('captchas').delete().eq('id', captchaId)

    // 验证图片数量
    if (images && images.length > 3) {
      return NextResponse.json({ error: '最多上传3张图片' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        title: title?.trim() || '',
        content: content.trim(),
        images: images || [],
        parent_id: null,
        target_type: 'message',
        is_admin_reply: user.is_admin,
        is_pinned: false,
      })
      .select(`
        *,
        user:user_id (id, username, is_admin)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, message: data })
  } catch (err) {
    console.error('Create message error:', err)
    return NextResponse.json({ error: '发表留言失败' }, { status: 500 })
  }
}
