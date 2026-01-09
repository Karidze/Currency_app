// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utkrbiiwqiqooxtgpidw.supabase.co'
const supabaseKey = 'sb_publishable_h7qurJBAJfCcqbvg0ZiFOA_sKBpp14F'

export const supabase = createClient(supabaseUrl, supabaseKey)
