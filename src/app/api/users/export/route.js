import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabase-server'

export async function GET(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user || !user.is_admin) {
      return NextResponse.json({ error: '无权限' }, { status: 403 })
    }

    // 获取所有非管理员用户（不暴露密码）
    const { data, error } = await supabase
      .from('users')
      .select('id, username, phone, birth_place, birth_date, bio, hobbies, is_admin, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ users: data, total: data.length })
  } catch (err) {
    console.error('Export users error:', err)
    return NextResponse.json({ error: '导出失败' }, { status: 500 })
  }
}
