import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data: fullUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      user: {
        ...user,
        ...(fullUser || {}),
      }
    })
  } catch (err) {
    console.error('Auth me error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
