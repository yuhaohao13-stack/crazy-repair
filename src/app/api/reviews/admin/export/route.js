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
      .select('id, name, phone, title, content, rating, images, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Export Supabase error:', error)
      return NextResponse.json({ error: '数据库查询失败' }, { status: 500 })
    }

    // CSV头
    const headers = ['ID', '用户名', '手机号', '标题', '评价内容', '评分', '图片', '提交时间']
    
    // 构建每一行
    const rows = (data || []).map(r => {
      const esc = (s) => {
        if (s == null) return ''
        const str = String(s)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return '"' + str.replace(/"/g, '""') + '"'
        }
        return str
      }
      return [
        r.id,
        esc(r.name),
        esc(r.phone),
        esc(r.title),
        esc(r.content),
        r.rating,
        esc((r.images || []).join('; ')),
        r.created_at,
      ].join(',')
    })

    const csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n')

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="crazy-repair-reviews-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return NextResponse.json({ error: '导出失败: ' + (err.message || '未知错误') }, { status: 500 })
  }
}
