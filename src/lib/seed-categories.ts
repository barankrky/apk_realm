import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// .env.local dosyasını yükle
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const categories = [
  { name: "Sosyal Medya", slug: "sosyal-medya" },
  { name: "Müzik", slug: "muzik" },
  { name: "Mesajlaşma", slug: "mesajlasma" },
  { name: "Eğlence", slug: "eglence" },
  { name: "Video", slug: "video" },
  { name: "Oyun", slug: "oyun" },
  { name: "Eğitim", slug: "egitim" },
  { name: "Sağlık", slug: "saglik" },
  { name: "İş", slug: "is" },
  { name: "Fotoğraf", slug: "fotograf" }
]

async function seedCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .upsert(categories, { 
        onConflict: 'slug',
        ignoreDuplicates: false 
      })

    if (error) {
      console.error('Kategori ekleme hatası:', error)
      return
    }

    console.log('Kategoriler başarıyla eklendi:', data)
    return data
  } catch (error) {
    console.error('Beklenmeyen hata:', error)
  }
}

seedCategories() 