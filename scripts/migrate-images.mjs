// ════════════════════════════════════════════
// 迁移脚本：把 messages 表里的 base64 图片上传到 Supabase Storage
// 运行：node scripts/migrate-images.mjs
// ════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fffxggvombgujzvzyooj.supabase.co'
const anonKey = 'sb_publishable_9PnquFi9cIm_HfABaipiIw_2vX_SNa8'

const supabase = createClient(supabaseUrl, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function uploadBase64(base64Str, prefix) {
  const matches = base64Str.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!matches) return null
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
  const buffer = Buffer.from(matches[2], 'base64')
  if (buffer.length > 5 * 1024 * 1024) {
    console.log(`  ⚠️  图片大于5MB，跳过`)
    return null
  }

  const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
  const filepath = `messages/${filename}`

  const { error: uploadError } = await supabase.storage
    .from('message-images')
    .upload(filepath, buffer, {
      contentType: `image/${matches[1] === 'jpg' ? 'jpeg' : matches[1]}`,
      upsert: false,
    })

  if (uploadError) {
    console.log(`  ❌ 上传失败:`, uploadError.message)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('message-images')
    .getPublicUrl(filepath)

  console.log(`  ✅ 上传成功: ${publicUrl} (${(buffer.length / 1024 / 1024).toFixed(2)}MB)`)
  return publicUrl
}

async function migrate() {
  console.log('=== 开始迁移 messages 表中的 base64 图片 ===\n')

  // 1. 查出所有包含 base64 图片的 messages
  const { data: messages, error } = await supabase
    .from('messages')
    .select('id, images')
    .not('images', 'is', null)

  if (error) {
    console.error('查询失败:', error)
    process.exit(1)
  }

  console.log(`共查到 ${messages.length} 条有 images 字段的记录\n`)

  let totalUploaded = 0
  let totalSkipped = 0

  for (const msg of messages) {
    if (!msg.images || msg.images.length === 0) {
      totalSkipped++
      continue
    }

    const hasBase64 = msg.images.some(img => typeof img === 'string' && img.startsWith('data:'))
    if (!hasBase64) {
      totalSkipped++
      continue
    }

    console.log(`📦 消息 #${msg.id}: ${msg.images.length} 张图`)

    const newImages = []
    let changed = false

    for (let i = 0; i < msg.images.length; i++) {
      const img = msg.images[i]
      if (typeof img === 'string' && img.startsWith('data:')) {
        console.log(`  图 #${i + 1}: 上传中...`)
        const url = await uploadBase64(img, `msg${msg.id}`)
        if (url) {
          newImages.push(url)
          changed = true
          totalUploaded++
        } else {
          // 上传失败，保留原值
          newImages.push(img)
        }
      } else {
        newImages.push(img)
      }
    }

    if (changed) {
      const { error: updateError } = await supabase
        .from('messages')
        .update({ images: newImages })
        .eq('id', msg.id)

      if (updateError) {
        console.log(`  ❌ 更新消息 #${msg.id} 失败:`, updateError.message)
      } else {
        console.log(`  ✅ 消息 #${msg.id} 已更新\n`)
      }
    }
  }

  console.log(`\n=== 迁移完成 ===`)
  console.log(`上传: ${totalUploaded} 张, 跳过: ${totalSkipped} 条`)
}

migrate().catch(console.error)
