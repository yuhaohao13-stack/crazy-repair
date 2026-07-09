import { NextResponse } from 'next/server'
import { findUserByLogin, verifyPassword, generateUserToken } from '@/lib/auth'

export async function POST(req) {
  try {
    const body = await req.json()
    const { login, password } = body

    if (!login?.trim()) return NextResponse.json({ error: '请输入用户名或手机号' }, { status: 400 })
    if (!password?.trim()) return NextResponse.json({ error: '请输入密码' }, { status: 400 })

    // 查找用户
    const user = await findUserByLogin(login.trim())
    if (!user) {
      return NextResponse.json({ error: '用户名/手机号或密码错误' }, { status: 401 })
    }

    // 验证密码
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: '用户名/手机号或密码错误' }, { status: 401 })
    }

    // 生成token
    const token = generateUserToken(user)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        phone: user.phone,
        is_admin: user.is_admin,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 })
  }
}
