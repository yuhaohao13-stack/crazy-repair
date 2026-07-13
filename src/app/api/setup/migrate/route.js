import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

const MIGRATIONS = [
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male'`,
]

export async function GET() {
  const results = []

  // 尝试通过 RPC 执行 SQL
  for (const sql of MIGRATIONS) {
    try {
      const { error } = await supabase.rpc('exec_sql', { query: sql })
      results.push({ sql: sql.substring(0, 60), ok: !error, error: error?.message, method: 'rpc' })
    } catch (e) {
      results.push({ sql: sql.substring(0, 60), ok: false, error: e.message, method: 'rpc' })
    }
  }

  // 检查 sequence 状态
  try {
    const { data: maxData } = await supabase
      .from('messages')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
    const maxId = maxData?.[0]?.id || 0
    results.push({
      message: `Current max message ID: ${maxId}`,
      note: maxId > 0 ? 'Run in Supabase SQL Editor: SELECT setval(\'messages_id_seq\', ' + maxId + ');' : 'No messages found',
    })
  } catch (e) {
    results.push({ error: e.message })
  }

  // 检查 gender 列是否存在
  try {
    const { error: testError } = await supabase
      .from('users')
      .insert({ username: '_migrate_test_temp', phone: '_00000000000', password_hash: '_test', gender: 'male' })
      .select('id')

    if (testError && testError.message?.includes('gender')) {
      results.push({
        message: 'gender column MISSING - will be handled by auto-retry in register route',
        note: 'Run in Supabase SQL Editor: ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT \'male\';',
      })
    } else {
      // 清理测试记录
      if (testError?.code !== '409' && testError?.code !== '23505') {
        await supabase.from('users').delete().eq('username', '_migrate_test_temp')
      }
      results.push({ message: 'gender column EXISTS' })
    }
  } catch (e) {
    results.push({ error: e.message })
  }

  return NextResponse.json({ results })
}
