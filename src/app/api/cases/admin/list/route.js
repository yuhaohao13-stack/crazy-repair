import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'

const BUCKET = 'case-articles'
const INDEX_PATH = 'index.json'

// 已发布（站内发布）的案例索引，供发布面板管理
export async function GET(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    let arr = []
    try {
      const { data } = await supabase.storage.from(BUCKET).download(INDEX_PATH)
      if (data) {
        const text = typeof data.text === 'function' ? await data.text() : Buffer.from(await data.arrayBuffer()).toString('utf8')
        arr = JSON.parse(text)
      }
    } catch {}
    if (!Array.isArray(arr)) arr = []

    return NextResponse.json({ cases: arr.filter(x => x && x.id) })
  } catch (err) {
    console.error('Case admin list error:', err)
    return NextResponse.json({ error: '获取列表失败' }, { status: 500 })
  }
}
