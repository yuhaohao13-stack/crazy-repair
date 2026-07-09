import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { verifyAdminToken } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    let user = getUserFromRequest(req)
    if (!user || !user.is_admin) {
      const token = req.headers.get('authorization')?.replace('Bearer ', '')
      if (!verifyAdminToken(token)) {
        return NextResponse.json({ error: '无权限' }, { status: 403 })
      }
      user = { is_admin: true }
    }

    const url = new URL(req.url)
    const userId = url.searchParams.get('id')

    if (!userId) {
      return NextResponse.json({ error: '缺少用户ID' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, username, phone, birth_place, birth_date, bio, hobbies, is_admin, created_at')
      .eq('id', userId)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    return NextResponse.json({ user: data })
  } catch (err) {
    console.error('Get user profile error:', err)
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 })
  }
}
