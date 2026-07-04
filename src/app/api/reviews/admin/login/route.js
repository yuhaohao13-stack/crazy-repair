import { NextResponse } from 'next/server'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/admin-auth'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: '账号或密码错误' }, { status: 401 })
    }

    // 创建简单token
    const token = Buffer.from(
      JSON.stringify({
        email,
        time: Date.now(),
        sig: `crazy_${email}_${ADMIN_PASSWORD}`,
      })
    ).toString('base64')

    return NextResponse.json({ success: true, token })
  } catch (err) {
    console.error('Admin login error:', err)
    return NextResponse.json({ error: '登录失败' }, { status: 500 })
  }
}
