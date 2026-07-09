import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { getUserFromRequest } from '@/lib/auth'

// 上传 base64 图片到 Supabase Storage
async function uploadImageBase64(base64Str) {
  try {
    const matches = base64Str.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!matches) return null
    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
    const buffer = Buffer.from(matches[2], 'base64')
    if (buffer.length > 5 * 1024 * 1024) return null
    const filename = `reply_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
    const filepath = `messages/${filename}`
    const { error: uploadError } = await supabase.storage
      .from('message-images')
      .upload(filepath, buffer, { contentType: `image/${matches[1] === 'jpg' ? 'jpeg' : matches[1]}`, upsert: false })
    if (uploadError) { console.error('Reply image upload error:', uploadError); return null }
    const { data: { publicUrl } } = supabase.storage.from('message-images').getPublicUrl(filepath)
    return publicUrl
  } catch { return null }
}

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

    // 将 base64 图片上传到 Supabase Storage
    let finalImages = (images || [])
    if (finalImages.some(img => img?.startsWith('data:'))) {
      const uploaded = await Promise.all(finalImages.map(img =>
        img?.startsWith('data:') ? uploadImageBase64(img) : Promise.resolve(img)
      ))
      finalImages = uploaded.filter(Boolean)
    }

    // 管理员回复自动置顶
    const isAdminReply = user.is_admin
    const isPinned = isAdminReply

    // 消息回复需要关联 parent_id，评价回复用 target_type/target_id
    const parentId = targetType === 'message' ? parseInt(targetId) : null

    const { data, error } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        content: content.trim(),
        images: finalImages,
        parent_id: parentId,
        target_type: targetType,
        target_id: parseInt(targetId),
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
