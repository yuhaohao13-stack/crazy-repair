import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fffxggvombgujzvzyooj.supabase.co'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9PnquFi9cIm_HfABaipiIw_2vX_SNa8'

// 使用 anon key + RLS 策略（RLS 已允许所有 CRUD）
export const supabase = createClient(supabaseUrl, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
