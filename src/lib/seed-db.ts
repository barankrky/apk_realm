import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { apps } from './seed-data'

// .env.local dosyasını yükle
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  try {
    const { data, error } = await supabase
      .from('apps')
      .upsert(apps, { 
        onConflict: 'package_name',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error('Hata:', error)
      return
    }

    console.log('Başarıyla aktarıldı:', data)
  } catch (error) {
    console.error('Beklenmeyen hata:', error)
  }
}

seedDatabase() 