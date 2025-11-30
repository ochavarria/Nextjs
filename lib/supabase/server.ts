import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ [Supabase] Missing environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  })
  throw new Error('Missing Supabase environment variables')
}

console.log('✅ [Supabase] Client config:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
  hasKey: !!supabaseAnonKey,
})

export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}
