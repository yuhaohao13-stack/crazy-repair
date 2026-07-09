import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { supabase } from '@/lib/supabase-server'

export async function POST(req) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await req.json()
    const { birth_place, birth_date, bio, hobbies } = body

    // 只允许修改这些字段（用户名和手机号不可修改）
    const updates = {}
    if (birth_place !== undefined) updates.birth_place = birth_place.trim()
    if (birth_date !== undefined) updates.birth_date = birth_date || null
    if (bio !== undefined) updates.bio = bio.trim()
    if (hobbies !== undefined) updates.hobbies = hobbies.trim()

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: '没有要修改的内容' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select('id, username, phone, birth_place, birth_date, bio, hobbies, is_admin')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, user: data })
  } catch (err) {
    console.error('Update user error:', err)
    return NextResponse.json({ error: '修改失败，请稍后重试' }, { status: 500 })
  }
}
