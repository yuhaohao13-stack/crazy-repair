import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

// 处理 GET 请求 — 获取个人资料
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: '登录已过期' }, { status: 401 })
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    return NextResponse.json({ user: { ...(profile || {}), email: user.email } })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// 处理 PUT 请求 — 更新个人资料
export async function PUT(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: '登录已过期' }, { status: 401 })
    }

    const body = await request.json()
    const { username, phone, wechat, address, birth_place, birth_date, bio, hobbies, gender } = body
    if (!username) {
      return NextResponse.json({ error: '昵称不能为空' }, { status: 400 })
    }

    const updateData = { username }
    if (phone !== undefined) updateData.phone = phone
    if (wechat !== undefined) updateData.wechat = wechat
    if (address !== undefined) updateData.address = address
    if (birth_place !== undefined) updateData.birth_place = birth_place
    if (birth_date !== undefined) updateData.birth_date = birth_date
    if (bio !== undefined) updateData.bio = bio
    if (hobbies !== undefined) updateData.hobbies = hobbies
    if (gender !== undefined) updateData.gender = gender

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Profile update error:', updateError)
      return NextResponse.json({ error: '保存失败: ' + updateError.message }, { status: 500 })
    }

    await supabase.auth.updateUser({ data: { username } }).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Profile PUT error:', err)
    return NextResponse.json({ error: '修改失败，请稍后重试' }, { status: 500 })
  }
}
