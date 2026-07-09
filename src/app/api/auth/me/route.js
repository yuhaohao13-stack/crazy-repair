import { NextResponse } from 'next/server'
import { getUserFromRequest, findUserById } from '@/lib/auth'

export async function GET(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 从数据库获取最新信息
    const dbUser = await findUserById(user.id)
    if (!dbUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: dbUser.id,
        username: dbUser.username,
        phone: dbUser.phone,
        gender: dbUser.gender || 'male',
        birth_place: dbUser.birth_place,
        birth_date: dbUser.birth_date,
        bio: dbUser.bio,
        hobbies: dbUser.hobbies,
        is_admin: dbUser.is_admin,
        created_at: dbUser.created_at,
      },
    })
  } catch (err) {
    console.error('Auth me error:', err)
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 })
  }
}
