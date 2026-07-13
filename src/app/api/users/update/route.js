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
    const { gender, birth_place, birth_date, bio, hobbies } = body

    const updates = {}
    if (gender !== undefined) updates.gender = gender
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
      .select('id, username, phone, gender, birth_place, birth_date, bio, hobbies, is_admin')
      .single()

    if (error) {
      console.error('Update user error:', JSON.stringify(error))
      return NextResponse.json({ error: '修改失败: ' + error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, user: data })
  } catch (err) {
    console.error('Update catch error:', err)
    return NextResponse.json({ error: '修改失败: ' + err.message }, { status: 500 })
  }
}
