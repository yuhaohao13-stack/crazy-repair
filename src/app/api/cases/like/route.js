import { NextResponse } from 'next/server'
import { bumpLike } from '@/lib/case-store'

// 公开点赞：POST { id } → { count }
export async function POST(req) {
  try {
    const { id } = await req.json().catch(() => ({}))
    if (!id || !/^[a-z0-9]{4,16}$/i.test(id)) {
      return NextResponse.json({ error: '参数错误' }, { status: 400 })
    }
    const count = await bumpLike(id)
    return NextResponse.json({ success: true, id, count })
  } catch (err) {
    console.error('Case like error:', err)
    return NextResponse.json({ error: '点赞失败' }, { status: 500 })
  }
}
