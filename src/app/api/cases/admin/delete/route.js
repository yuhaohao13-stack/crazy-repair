import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'
import { tagSlugMap } from '@/lib/caseTags'

const BUCKET = 'case-articles'
const INDEX_PATH = 'index.json'

// 删除站内发布的案例（误发时用）
export async function POST(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const { id } = await req.json().catch(() => ({}))
    if (!id || !/^[a-z0-9]{4,16}$/i.test(id)) {
      return NextResponse.json({ error: '参数错误' }, { status: 400 })
    }

    await supabase.storage.from(BUCKET).remove([`cases/${id}.json`])

    let arr = []
    try {
      const { data } = await supabase.storage.from(BUCKET).download(INDEX_PATH)
      if (data) {
        const text = typeof data.text === 'function' ? await data.text() : Buffer.from(await data.arrayBuffer()).toString('utf8')
        arr = JSON.parse(text)
      }
    } catch {}
    if (!Array.isArray(arr)) arr = []

    const removed = arr.find(x => x && x.id === id)
    const nextIdx = arr.filter(x => x && x.id !== id)
    await supabase.storage
      .from(BUCKET)
      .upload(INDEX_PATH, Buffer.from(JSON.stringify(nextIdx), 'utf8'), {
        contentType: 'application/json',
        upsert: true,
      })

    try {
      revalidatePath('/cases')
      revalidatePath(`/cases/${id}`)
      const slug = removed && tagSlugMap[removed.tag]
      if (slug) revalidatePath(`/cases/tag/${slug}`)
    } catch {}

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Case delete error:', err)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
