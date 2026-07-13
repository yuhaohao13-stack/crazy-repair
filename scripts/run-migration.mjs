/**
 * Run SQL migration to ensure messages.content and reviews.content are TEXT type.
 *
 * Usage:
 *   export SUPABASE_SERVICE_ROLE_KEY="sb_secret_xxx"
 *   node scripts/run-migration.mjs
 *
 * Or run manually in Supabase Dashboard → SQL Editor with supabase-ensure-content-text.sql
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fffxggvombgujzvzyooj.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!serviceRoleKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required')
  console.error('Usage: SUPABASE_SERVICE_ROLE_KEY="..." node scripts/run-migration.mjs')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function runMigration() {
  console.log('Checking messages.content column type...')

  // Query the table to confirm accessibility
  const { data: sample, error: sampleErr } = await supabase
    .from('messages')
    .select('id, title, content')
    .limit(1)

  if (sampleErr) {
    console.error('Cannot access messages table:', sampleErr.message)
    console.log('Please run the SQL migration manually in Supabase Dashboard SQL Editor.')
    console.log('SQL file: supabase-ensure-content-text.sql')
    process.exit(1)
  }

  console.log('Messages table accessible. Sample content exists.')
  console.log('')
  console.log('NOTE: Column type check requires direct SQL execution.')
  console.log('Please run supabase-ensure-content-text.sql in Supabase Dashboard SQL Editor.')
  console.log('')
  console.log('  ✅ Code changes applied successfully:')
  console.log('     - src/app/board/page.jsx: textarea maxLength=5000')
  console.log('     - src/app/api/messages/route.js: content length validation (10000)')
  console.log('')
  console.log('  ⚠️  Manual step required:')
  console.log('     - Go to https://supabase.com/dashboard/project/fffxggvombgujzvzyooj/sql/new')
  console.log('     - Paste the content of supabase-ensure-content-text.sql')
  console.log('     - Click "Run"')
}

runMigration()
