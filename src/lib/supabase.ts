import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// .env.local dosyasını yükle
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey) 