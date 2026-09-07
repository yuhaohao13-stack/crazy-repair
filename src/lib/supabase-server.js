import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fffxggvombgujzvzyooj.supabase.co'
const supabaseServerKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9PnquFi9cIm_HfABaipiIw_2vX_SNa8'

// 服务端客户端：必须优先用 service_role key（绕过 RLS），仅开发环境无 service role 时才回退 anon
export const supabase = createClient(supabaseUrl, supabaseServerKey, {
  auth: { persistSession: false },
})
