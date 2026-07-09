import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { getUserFromRequest } from '@/lib/auth'

// 回复评价或留言
export async function POST(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }

    const body = await req.json()
    const { content, images, targetType, targetId, captchaId, captchaValue } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入回复内容' }, { status: 400 })
    }

    if (!targetType || !targetId) {
      return NextResponse.json({ error: '缺少回复目标' }, { status: 400 })
    }

    if (!['message', 'review'].includes(targetType)) {
      return NextResponse.json({ error: '无效的回复类型' }, { status: 400 })
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

    // 管理员回复自动置顶
    const isAdminReply = user.is_admin
    const isPinned = isAdminReply

    const { data, error } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        content: content.trim(),
        images: images || [],
        parent_id: null,
        target_type: targetType,
        target_id: targetId,
        is_admin_reply: isAdminReply,
        is_pinned: isPinned,
      })
      .select(`
        *,
        user:user_id (id, username, is_admin)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, reply: data })
  } catch (err) {
    console.error('Reply error:', err)
    return NextResponse.json({ error: '回复失败' }, { status: 500 })
  }
}

// 获取某个评价/留言的回复
export async function GET(req) {
  try {
    const url = new URL(req.url)
    const targetType = url.searchParams.get('targetType')
    const targetId = url.searchParams.get('targetId')

    if (!targetType || !targetId) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        user:user_id (id, username, is_admin)
      `)
      .eq('target_type', targetType)
      .eq('target_id', targetId)
      .is('parent_id', null)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ replies: data || [] })
  } catch (err) {
    console.error('Get replies error:', err)
    return NextResponse.json({ error: '获取回复失败' }, { status: 500 })
  }
}
