import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { hashPassword } from '@/lib/auth'
import { validatePhone } from '@/lib/phone'

export async function POST(req) {
  try {
    const body = await req.json()
    const { phone, birth_place, birth_date, newPassword, captchaId, captchaValue } = body

    // 验证必填
    if (!phone?.trim()) return NextResponse.json({ error: '请输入手机号' }, { status: 400 })
    const phoneCheck = validatePhone(phone.trim())
    if (!phoneCheck.valid) return NextResponse.json({ error: phoneCheck.error || '手机号格式不正确' }, { status: 400 })
    const cleanPhone = phoneCheck.formatted || phone.trim()
    if (!birth_place?.trim()) return NextResponse.json({ error: '请输入出生地' }, { status: 400 })
    if (!birth_date?.trim()) return NextResponse.json({ error: '请选择出生年月' }, { status: 400 })
    if (!newPassword?.trim() || newPassword.length < 6)
      return NextResponse.json({ error: '新密码至少6位' }, { status: 400 })

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

    // 通过手机号查找用户
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, phone, birth_place, birth_date')
      .eq('phone', cleanPhone)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: '该手机号未注册' }, { status: 404 })
    }

    // 验证出生地和出生年月
    if (user.birth_place?.trim() !== birth_place.trim()) {
      return NextResponse.json({ error: '出生地信息不匹配' }, { status: 403 })
    }

    if (user.birth_date !== birth_date) {
      return NextResponse.json({ error: '出生年月信息不匹配' }, { status: 403 })
    }

    // 加密新密码
    const passwordHash = await hashPassword(newPassword)

    // 更新密码
    const { error: updateError } = await supabase
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('id', user.id)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, message: '密码重置成功' })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json({ error: '密码重置失败，请稍后重试' }, { status: 500 })
  }
}
