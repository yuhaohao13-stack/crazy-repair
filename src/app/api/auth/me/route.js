import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 从 auth.users + profiles 获取完整用户信息
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      user: {
        ...user,
        ...(profile || {}),
      }
    })
  } catch (err) {
    console.error('Auth me error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
