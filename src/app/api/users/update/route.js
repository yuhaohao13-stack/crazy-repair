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

    // Try update with all fields. If gender column is missing, retry without it.
    let result = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select('id, username, phone, gender, birth_place, birth_date, bio, hobbies, is_admin')
      .single()

    // If gender column doesn't exist, retry without gender
    if (result.error && result.error.message?.includes('gender')) {
      delete updates.gender
      if (Object.keys(updates).length > 0) {
        result = await supabase
          .from('users')
          .update(updates)
          .eq('id', user.id)
          .select('id, username, phone, birth_place, birth_date, bio, hobbies, is_admin')
          .single()
      }
    }

    if (result.error) {
      console.error('Update user error:', JSON.stringify(result.error))
      return NextResponse.json({ error: '修改失败: ' + result.error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, user: result.data })
  } catch (err) {
    console.error('Update catch error:', err)
    return NextResponse.json({ error: '修改失败: ' + err.message }, { status: 500 })
  }
}
