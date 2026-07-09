import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { hashPassword, generateUserToken, checkUserExists } from '@/lib/auth'
import { validatePhone } from '@/lib/phone'

export async function POST(req) {
  try {
    const body = await req.json()
    const { username, phone, password, birth_place, birth_date, bio, hobbies, address, captchaId, captchaValue } = body

    // 验证必填
    if (!username?.trim()) return NextResponse.json({ error: '请输入用户名' }, { status: 400 })
    if (!phone?.trim()) return NextResponse.json({ error: '请输入手机号' }, { status: 400 })
    const phoneCheck = validatePhone(phone.trim())
    if (!phoneCheck.valid) return NextResponse.json({ error: phoneCheck.error || '手机号格式不正确' }, { status: 400 })
    const cleanPhone = phoneCheck.formatted || phone.trim()
    if (!password?.trim() || password.length < 6)
      return NextResponse.json({ error: '密码至少6位' }, { status: 400 })
    if (!username.match(/^[a-zA-Z0-9\u4e00-\u9fa5_]{2,20}$/))
      return NextResponse.json({ error: '用户名仅支持中文、英文、数字和下划线，2-20位' }, { status: 400 })

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

    // 检查用户名/手机号是否已存在
    const existing = await checkUserExists(username.trim(), cleanPhone)
    if (existing.exists) {
      const field = existing.field === 'username' ? '用户名' : '手机号'
      return NextResponse.json({ error: `${field}已被注册` }, { status: 409 })
    }

    // 加密密码
    const passwordHash = await hashPassword(password)

    // 插入用户
    const { data, error } = await supabase
      .from('users')
      .insert({
        username: username.trim(),
        phone: cleanPhone,
        password_hash: passwordHash,
        birth_place: birth_place?.trim() || '',
        birth_date: birth_date || null,
        bio: bio?.trim() || '',
        hobbies: hobbies?.trim() || '',
        address: address?.trim() || '',
        is_admin: false,
      })
      .select('id, username, phone, is_admin')
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: '用户名或手机号已被注册' }, { status: 409 })
      }
      throw error
    }

    // 生成token
    const token = generateUserToken(data)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: data.id,
        username: data.username,
        phone: data.phone,
        is_admin: data.is_admin,
      },
    })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: '注册失败，请稍后重试' }, { status: 500 })
  }
}
