import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'

const MAX_FILES = 9
const MAX_SIZE = 5 * 1024 * 1024 // case-images 桶限制 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

// 管理员发布案例时上传图片 → case-images 桶（公开）
export async function POST(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权，请先登录管理员' }, { status: 401 })
    }

    const formData = await req.formData()
    const files = formData.getAll('files').filter(f => f instanceof File)

    if (files.length === 0) return NextResponse.json({ error: '请选择图片' }, { status: 400 })
    if (files.length > MAX_FILES) return NextResponse.json({ error: `最多上传 ${MAX_FILES} 张图片` }, { status: 400 })

    const urls = []
    for (const file of files) {
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: `不支持的图片格式：${file.type || '未知'}` }, { status: 400 })
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: '单张图片不能超过 5MB' }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const rawExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
      const ext = rawExt || 'jpg'
      const path = `cases/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('case-images')
        .upload(path, buffer, { contentType: file.type, upsert: false })

      if (uploadError) {
        console.error('Case image upload error:', uploadError)
        return NextResponse.json({ error: `图片上传失败：${uploadError.message}` }, { status: 500 })
      }

      const { data: { publicUrl } } = supabase.storage.from('case-images').getPublicUrl(path)
      urls.push(publicUrl)
    }

    return NextResponse.json({ urls })
  } catch (err) {
    console.error('Case upload endpoint error:', err)
    return NextResponse.json({ error: '上传失败' }, { status: 500 })
  }
}
