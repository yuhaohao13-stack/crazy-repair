import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rsndnhdimruisysacujg.supabase.co'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ZcrY62Opev_eOmhWlKpCqg_NZPjy3Z8'

// 使用 anon key + RLS 策略（RLS 已允许所有 CRUD）
export const supabase = createClient(supabaseUrl, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
