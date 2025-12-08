// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kseqdpeewrvujvqnqfmh.supabase.co'
const supabaseKey = 'sb_publishable_ixncOWwFfplyR4zU5xJpUg_O8Ni527b'

export const supabase = createClient(supabaseUrl, supabaseKey)
