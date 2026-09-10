import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'
import { tagSlugMap } from '@/lib/caseTags'

const BUCKET = 'case-articles'
const INDEX_PATH = 'index.json'

// 8 位十六进制 id（与静态案例 id 风格一致）
function makeId() {
  return Math.random().toString(16).slice(2, 10).padEnd(8, '0')
}

function plainExcerpt(content, len = 160) {
  return (content || '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*`>\-━•]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, len)
}

async function readIndex() {
  try {
    const { data } = await supabase.storage.from(BUCKET).download(INDEX_PATH)
    if (!data) return []
    const text = typeof data.text === 'function' ? await data.text() : Buffer.from(await data.arrayBuffer()).toString('utf8')
    const arr = JSON.parse(text)
    return Array.isArray(arr) ? arr.filter(x => x && x.id) : []
  } catch {
    return []
  }
}

// 管理员在站内发布维修案例
export async function POST(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权，请先登录管理员' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const { title, tag, content, images, youtube_url, douyin_url } = body || {}

    if (!title?.trim()) return NextResponse.json({ error: '请输入标题' }, { status: 400 })
    if (!tag?.trim()) return NextResponse.json({ error: '请选择品牌' }, { status: 400 })
    if (!content?.trim()) return NextResponse.json({ error: '请输入文案内容' }, { status: 400 })

    const imgs = Array.isArray(images)
      ? images.filter(u => typeof u === 'string' && /^https?:\/\//.test(u)).slice(0, 9)
      : []

    const id = makeId()
    const date = new Date().toISOString().slice(0, 10)
    const record = {
      id,
      title: title.trim(),
      tag: tag.trim(),
      date,
      excerpt: plainExcerpt(content),
      content: content.trim(),
      images: imgs,
      youtube_url: (youtube_url || '').trim(),
      douyin_url: (douyin_url || '').trim(),
      source: 'admin',
      created_at: new Date().toISOString(),
    }

    // 1) 保存正文
    const up1 = await supabase.storage
      .from(BUCKET)
      .upload(`cases/${id}.json`, Buffer.from(JSON.stringify(record), 'utf8'), {
        contentType: 'application/json',
        upsert: true,
      })
    if (up1.error) {
      console.error('case save error:', up1.error)
      return NextResponse.json({ error: `保存案例失败：${up1.error.message}` }, { status: 500 })
    }

    // 2) 更新索引（新的在前）
    const idx = await readIndex()
    const meta = { id, title: record.title, tag: record.tag, date, excerpt: record.excerpt }
    const nextIdx = [meta, ...idx.filter(m => m.id !== id)]
    const up2 = await supabase.storage
      .from(BUCKET)
      .upload(INDEX_PATH, Buffer.from(JSON.stringify(nextIdx), 'utf8'), {
        contentType: 'application/json',
        upsert: true,
      })
    if (up2.error) {
      console.error('case index save error:', up2.error)
      return NextResponse.json({ error: `索引更新失败：${up2.error.message}` }, { status: 500 })
    }

    // 3) 刷新页面缓存
    try {
      revalidatePath('/cases')
      revalidatePath(`/cases/${id}`)
      const slug = tagSlugMap[record.tag]
      if (slug) revalidatePath(`/cases/tag/${slug}`)
    } catch {}

    return NextResponse.json({ success: true, id, url: `/cases/${id}` })
  } catch (err) {
    console.error('Case create error:', err)
    return NextResponse.json({ error: '发布失败' }, { status: 500 })
  }
}
