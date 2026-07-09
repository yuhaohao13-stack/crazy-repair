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
      // 并行查消息 + 回复
      const msgFields = 'id,user_id,title,content,images,is_pinned,is_admin_reply,created_at'
      const replyFields = 'id,user_id,content,images,is_pinned,is_admin_reply,created_at'

      const [msgRes, repliesRes] = await Promise.all([
        supabase.from('messages').select(msgFields).eq('id', messageId).single(),
        supabase.from('messages').select(replyFields).eq('parent_id', messageId).order('is_pinned', { ascending: false }).order('created_at', { ascending: true }),
      ])

      if (msgRes.error || !msgRes.data) {
        return NextResponse.json({ error: '留言不存在' }, { status: 404 })
      }

      const message = msgRes.data
      const allReplies = repliesRes.data || []

      // 详情页：保留完整数据（含 base64 图片）

      // 获取用户数据
      const userIds = new Set([message.user_id])
      allReplies.forEach(r => { if (r.user_id) userIds.add(r.user_id) })

      let usersMap = {}
      if (userIds.size > 0) {
        const { data: users } = await supabase.from('users').select('id,username,is_admin').in('id', [...userIds])
        if (users) users.forEach(u => { usersMap[u.id] = u })
      }

      return NextResponse.json({
        message: { ...message, user: usersMap[message.user_id] || null },
        replies: allReplies.map(r => ({ ...r, user: usersMap[r.user_id] || null })),
      })
    }

    // ─── 分页参数 ───
    const offset = (page - 1) * pageSize
    // 列表模式只返回图片数量和引用，不返回 base64 原图（详情页才需要）
    const fields = 'id,user_id,title,content,images,is_pinned,is_admin_reply,created_at'

    // ─── 第一轮：并行获取置顶 + 分页消息 + 总数 ───
    const [pinnedRes, msgsRes, countRes] = await Promise.all([
      // 1. 置顶留言
      supabase
        .from('messages')
        .select(fields)
        .is('parent_id', null)
        .is('target_id', null)
        .eq('is_pinned', true)
        .eq('target_type', 'message')
        .order('created_at', { ascending: false }),

      // 2. 普通留言分页
      supabase
        .from('messages')
        .select(fields)
        .is('parent_id', null)
        .is('target_id', null)
        .eq('target_type', 'message')
        .eq('is_pinned', false)
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1),

      // 3. 总数（轻量查询）
      supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .is('parent_id', null)
        .is('target_id', null)
        .eq('target_type', 'message'),
    ])

    if (pinnedRes.error) throw pinnedRes.error
    if (msgsRes.error) throw msgsRes.error

    const pinnedData = pinnedRes.data || []
    const messagesData = msgsRes.data || []
    const total = countRes.count || 0

    // ─── 第二轮：只查当前页消息的回复 + 用户数据 ───
    const parentIds = [...pinnedData.map(m => m.id), ...messagesData.map(m => m.id)]
    const userIds = new Set()
    ;[...pinnedData, ...messagesData].forEach(m => { if (m.user_id) userIds.add(m.user_id) })

    let allReplies = []
    let usersMap = {}

    // 查回复（限定到当前页消息，不扫全表）
    if (parentIds.length > 0) {
      const { data: repliesData } = await supabase
        .from('messages')
        .select(`id,parent_id,user_id,content,images,is_pinned,is_admin_reply,created_at`)
        .in('parent_id', parentIds)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true })

      allReplies = repliesData || []
      allReplies.forEach(r => { if (r.user_id) userIds.add(r.user_id) })
    }

    // 查用户数据
    if (userIds.size > 0) {
      const { data: users } = await supabase
        .from('users')
        .select('id,username,is_admin')
        .in('id', [...userIds])
      if (users) {
        users.forEach(u => { usersMap[u.id] = u })
      }
    }

    // 组装回复：每条留言最多2条预览 + 统计总数
    const repliesMap = {}
    const countMap = {}

    allReplies.forEach(r => {
      const pid = r.parent_id
      countMap[pid] = (countMap[pid] || 0) + 1
      if (!repliesMap[pid]) repliesMap[pid] = []
      if (repliesMap[pid].length < 2) {
        repliesMap[pid].push({
          ...r,
          user: usersMap[r.user_id] || null,
        })
      }
    })

    // 列表页：去掉 base64 图片数据（6MB+ 的响应体就是它）
    const stripListImages = (m) => ({
      ...m,
      images: (m.images?.length > 0) ? m.images.map(img => img?.startsWith('data:') ? '' : img).filter(Boolean) : [],
    })

    const attachUserAndReplies = (m) => ({
      ...m,
      user: usersMap[m.user_id] || null,
      replies: (repliesMap[m.id] || []).map(r => ({
        ...r,
        images: (r.images?.length > 0) ? r.images.map(img => img?.startsWith('data:') ? '' : img).filter(Boolean) : [],
      })),
      replyCount: countMap[m.id] || 0,
    })

    return NextResponse.json({
      pinned: pinnedData.map(attachUserAndReplies),
      messages: messagesData.map(attachUserAndReplies),
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
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
