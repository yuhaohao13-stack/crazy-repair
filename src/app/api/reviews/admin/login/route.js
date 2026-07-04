import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: '账号或密码错误' }, { status: 401 })
    }

    // 创建简单token
    const token = Buffer.from(
      JSON.stringify({
        email,
        time: Date.now(),
        sig: `crazy_${email}_${adminPassword}`,
      })
    ).toString('base64')

    return NextResponse.json({ success: true, token })
  } catch (err) {
    console.error('Admin login error:', err)
    return NextResponse.json({ error: '登录失败' }, { status: 500 })
  }
}
