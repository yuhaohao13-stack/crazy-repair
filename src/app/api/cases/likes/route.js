import { NextResponse } from 'next/server'
import { getLikeCounts } from '@/lib/case-store'

// 公开：返回全部案例点赞数 { counts: { caseId: n } }
export async function GET() {
  try {
    const counts = await getLikeCounts()
    return NextResponse.json({ counts })
  } catch (err) {
    console.error('Case likes GET error:', err)
    return NextResponse.json({ counts: {} })
  }
}
