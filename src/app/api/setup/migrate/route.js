import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-server'

const MIGRATIONS = [
  `ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male'`,
]

export async function GET() {
  const results = []
  for (const sql of MIGRATIONS) {
    try {
      const { error } = await supabase.rpc('exec_sql', { query: sql })
      results.push({ sql: sql.substring(0, 60), ok: !error, error: error?.message })
    } catch (e) {
      results.push({ sql: sql.substring(0, 60), ok: false, error: e.message })
    }
  }
  return NextResponse.json({ results })
}
