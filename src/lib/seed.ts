import { supabase } from './supabase'

async function seedCategories() {
  const categories = [
    { name: 'Oyunlar', slug: 'games' },
    { name: 'Sosyal Medya', slug: 'social' },
    { name: 'Araçlar', slug: 'tools' },
    { name: 'Eğitim', slug: 'education' },
    { name: 'Müzik', slug: 'music' },
    { name: 'Video', slug: 'video' },
  ]

  const { data, error } = await supabase
    .from('categories')
    .insert(categories)
    .select()

  if (error) {
    console.error('Kategoriler eklenirken hata:', error)
    return
  }

  console.log('Kategoriler başarıyla eklendi:', data)
  return data
}

async function seedApps() {
  const { data: categories } = await supabase
    .from('categories')
    .select('id, slug')

  if (!categories) {
    console.error('Kategoriler bulunamadı')
    return
  }

  const getCategoryId = (slug: string) => {
    return categories.find(c => c.slug === slug)?.id
  }

  const apps = [
    {
      name: 'Spotify Premium',
      package_name: 'com.spotify.music',
      category_id: getCategoryId('music'),
      version: '8.8.2.3',
      size: '30 MB',
      downloads: 850000,
      rating: 4.8,
      is_mod: true,
      mod_features: ['Premium özelliklerin kilidi açıldı', 'Reklamsız dinleme', 'Sınırsız atlama', 'Çevrimdışı dinleme'],
      description: 'Spotify, milyonlarca şarkı, podcast ve videoya anında erişim sağlayan dijital müzik, podcast ve video akış hizmetidir.',
      icon_url: 'https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w240-h480-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/GnYnNfKBr2nysHBYgYuN8ugxQHj6MWKVxnEJR5_8gnC3DUvnTlG_kIqoKMID9QHkLHpf=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/8KpwawHGe1XxGlbAWNqm8YPfxmZgZkn5ZCwkjEOoNc3T_nLqoHYoii-VLBvJqNhOBjg=w2560-h1440-rw'
      ],
      android_version: '5.0 ve üzeri',
      developer: 'Spotify AB'
    },
    {
      name: 'WhatsApp',
      package_name: 'com.whatsapp',
      category_id: getCategoryId('social'),
      version: '2.24.3.12',
      size: '48 MB',
      downloads: 1200000,
      rating: 4.5,
      is_mod: false,
      description: 'WhatsApp Messenger: 2 milyardan fazla kişinin kullandığı, ücretsiz ve güvenli mesajlaşma ve arama uygulaması.',
      icon_url: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw'
      ],
      android_version: '4.1 ve üzeri',
      developer: 'WhatsApp LLC'
    },
    {
      name: 'PUBG Mobile',
      package_name: 'com.tencent.ig',
      category_id: getCategoryId('games'),
      version: '2.9.0',
      size: '721 MB',
      downloads: 2100000,
      rating: 4.3,
      is_mod: false,
      description: 'PUBG Mobile, orijinal battle royale deneyimini mobil cihazlara getiren resmi oyundur.',
      icon_url: 'https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=w240-h480-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'Tencent Games'
    }
  ]

  const { data, error } = await supabase
    .from('apps')
    .insert(apps)
    .select()

  if (error) {
    console.error('Uygulamalar eklenirken hata:', error)
    return
  }

  console.log('Uygulamalar başarıyla eklendi:', data)
}

export async function seed() {
  try {
    await seedCategories()
    await seedApps()
    console.log('Tüm veriler başarıyla eklendi')
  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error)
  }
} 