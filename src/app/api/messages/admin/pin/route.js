import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { verifyAdminToken } from '@/lib/admin-auth'
import { supabase } from '@/lib/supabase-server'

export async function POST(req) {
  try {
    let user = getUserFromRequest(req)
    if (!user || !user.is_admin) {
      const token = req.headers.get('authorization')?.replace('Bearer ', '')
      if (!verifyAdminToken(token)) {
        return NextResponse.json({ error: '无权限' }, { status: 403 })
      }
      user = { is_admin: true }
    }

    const body = await req.json()
    const { id, pinned } = body

    if (!id) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('messages')
      .update({ is_pinned: pinned !== false })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, message: data })
  } catch (err) {
    console.error('Admin pin error:', err)
    return NextResponse.json({ error: '操作失败' }, { status: 500 })
  }
}
