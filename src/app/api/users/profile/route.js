import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

// 处理 GET 请求 — 获取个人资料
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: '未登录' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return Response.json({ error: '登录已过期' }, { status: 401 })
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (profileError && profileError.code !== 'PGRST116') {
      return Response.json({ error: '获取资料失败' }, { status: 500 })
    }
    return Response.json({ user: { ...profile, email: user.email } })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

// 处理 PUT 请求 — 更新个人资料
export async function PUT(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: '未登录' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return Response.json({ error: '登录已过期' }, { status: 401 })
    }
    const { username, phone, wechat, address, avatar_url } = await request.json()
    if (!username) {
      return Response.json({ error: '昵称不能为空' }, { status: 400 })
    }
    const updateData = { username, phone, wechat, address }
    if (avatar_url) updateData.avatar_url = avatar_url

    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)
    if (updateError) {
      console.error('Profile update error:', updateError)
      return Response.json({ error: '保存失败: ' + updateError.message }, { status: 500 })
    }
    await supabase.auth.updateUser({ data: { username } }).catch(() => {})
    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
