import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, phone, title, content, rating, images, captchaId, captchaValue } = body

    // 验证必填字段
    if (!name?.trim()) return NextResponse.json({ error: '请输入用户名' }, { status: 400 })
    if (!phone?.trim()) return NextResponse.json({ error: '请输入手机号' }, { status: 400 })
    if (!phone.match(/^1\d{10}$/) && !phone.match(/^\d{7,15}$/))
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 })
    if (!title?.trim()) return NextResponse.json({ error: '请输入标题' }, { status: 400 })
    if (!content?.trim()) return NextResponse.json({ error: '请输入评价内容' }, { status: 400 })

    // 验证评分
    const ratingNum = parseInt(rating)
    if (ratingNum < 1 || ratingNum > 5)
      return NextResponse.json({ error: '评分必须在1-5之间' }, { status: 400 })

    // 验证图片数量
    if (images && images.length > 3)
      return NextResponse.json({ error: '最多上传3张图片' }, { status: 400 })

    // 验证验证码
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

    // 删除已使用的验证码
    await supabase.from('captchas').delete().eq('id', captchaId)

    // 插入评价
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        title: title.trim(),
        content: content.trim(),
        rating: ratingNum,
        images: images || [],
        approved: true,
      })
      .select('id, name, title, created_at')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, review: data })
  } catch (err) {
    console.error('Submit review error:', err)
    return NextResponse.json({ error: '提交评价失败，请稍后重试' }, { status: 500 })
  }
}
