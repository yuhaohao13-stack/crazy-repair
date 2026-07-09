import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabase-server'

export async function POST(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user || !user.is_admin) {
      return NextResponse.json({ error: '无权限' }, { status: 403 })
    }

    const body = await req.json()
    const { id, type } = body // type: 'message' or 'review'

    if (!id) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 })
    }

    if (type === 'message') {
      // 删除留言及其所有回复
      await supabase.from('messages').delete().eq('id', id)
      await supabase.from('messages').delete().eq('parent_id', id)
    } else if (type === 'review') {
      // 删除评价
      await supabase.from('reviews').delete().eq('id', id)
    } else {
      return NextResponse.json({ error: '无效的类型' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Admin delete error:', err)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
