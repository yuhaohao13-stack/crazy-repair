import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function GET(req) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // CSV头
    const headers = ['ID', '用户名', '手机号', '标题', '评价内容', '评分', '图片', '提交时间']
    const csvRows = [headers.join(',')]

    for (const r of data || []) {
      csvRows.push([
        r.id,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `"${r.phone}"`,
        `"${(r.title || '').replace(/"/g, '""')}"`,
        `"${(r.content || '').replace(/"/g, '""')}"`,
        r.rating,
        `"${(r.images || []).join('; ')}"`,
        r.created_at,
      ].join(','))
    }

    const csv = '\uFEFF' + csvRows.join('\n') // BOM for Excel

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="客户评价_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return NextResponse.json({ error: '导出失败' }, { status: 500 })
  }
}
