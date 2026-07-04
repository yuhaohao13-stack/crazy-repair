import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files')

    if (!files || files.length === 0) {
      return NextResponse.json({ error: '请选择图片' }, { status: 400 })
    }

    if (files.length > 3) {
      return NextResponse.json({ error: '最多上传3张图片' }, { status: 400 })
    }

    const urls = []

    for (const file of files) {
      if (!(file instanceof File)) continue

      // 验证文件类型
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: `不支持的文件格式: ${file.type}` }, { status: 400 })
      }

      // 验证文件大小（5MB）
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: '图片大小不能超过5MB' }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split('.').pop() || 'jpg'
      const filename = `review_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
      const filepath = `reviews/${filename}`

      const { error: uploadError } = await supabase.storage
        .from('review-images')
        .upload(filepath, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('review-images')
        .getPublicUrl(filepath)

      urls.push(publicUrl)
    }

    if (urls.length === 0) {
      return NextResponse.json({ error: '图片上传失败' }, { status: 500 })
    }

    return NextResponse.json({ urls })
  } catch (err) {
    console.error('Upload endpoint error:', err)
    return NextResponse.json({ error: '上传失败' }, { status: 500 })
  }
}
