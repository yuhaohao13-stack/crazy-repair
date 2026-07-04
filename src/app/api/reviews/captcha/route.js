import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function GET() {
  try {
    // 生成随机4位数
    const code = String(Math.floor(1000 + Math.random() * 9000))
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('captchas')
      .insert({ code, expires_at: expiresAt })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({
      captchaId: data.id,
      code,
      expiresAt,
    })
  } catch (err) {
    console.error('Captcha error:', err)
    return NextResponse.json({ error: '生成验证码失败' }, { status: 500 })
  }
}
