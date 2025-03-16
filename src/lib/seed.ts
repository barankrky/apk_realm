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
    .upsert(categories, { onConflict: 'slug' })
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
    },
    {
      name: 'Instagram',
      package_name: 'com.instagram.android',
      category_id: getCategoryId('social'),
      version: '302.0.0.0',
      size: '45 MB',
      downloads: 1500000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Reklamsız', 'Hikayeleri gizli izleme', 'Yüksek kalitede indirme'],
      description: 'Instagram MOD APK - Fotoğraf ve video paylaşım uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '8.0 ve üzeri',
      developer: 'Meta'
    },
    {
      name: 'TikTok',
      package_name: 'com.zhiliaoapp.musically',
      category_id: getCategoryId('social'),
      version: '33.0.3',
      size: '80 MB',
      downloads: 1200000,
      rating: 4.4,
      is_mod: true,
      mod_features: ['Filigransız video indirme', 'Bölge kilidi kaldırıldı'],
      description: 'TikTok MOD APK - Kısa video paylaşım platformu',
      icon_url: 'https://play-lh.googleusercontent.com/OS-MhSWOPtlUZLt0_UP5TI4juSf0XhyHxGfJa6pA-UIYkZ1BB6QHTZwaMEzZDPqYsmk=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '5.0 ve üzeri',
      developer: 'ByteDance'
    },
    {
      name: 'Netflix',
      package_name: 'com.netflix.mediaclient',
      category_id: getCategoryId('video'),
      version: '8.85.0',
      size: '35 MB',
      downloads: 900000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Premium özellikler açık', '4K streaming'],
      description: 'Netflix MOD APK - Film ve dizi izleme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '8.0 ve üzeri',
      developer: 'Netflix, Inc.'
    },
    {
      name: 'YouTube Premium',
      package_name: 'com.google.android.youtube',
      category_id: getCategoryId('video'),
      version: '19.05.36',
      size: '55 MB',
      downloads: 2000000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Reklamsız izleme', 'Arka planda oynatma', '4K video'],
      description: 'YouTube Premium MOD APK - Video izleme platformu',
      icon_url: 'https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Google LLC'
    },
    {
      name: 'Telegram Premium',
      package_name: 'org.telegram.messenger',
      category_id: getCategoryId('social'),
      version: '10.6.2',
      size: '50 MB',
      downloads: 800000,
      rating: 4.8,
      is_mod: true,
      mod_features: ['Premium özellikler açık', 'Sınırsız depolama'],
      description: 'Telegram Premium MOD APK - Güvenli mesajlaşma uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '5.0 ve üzeri',
      developer: 'Telegram FZ-LLC'
    },
    {
      name: 'Facebook',
      package_name: 'com.facebook.katana',
      category_id: getCategoryId('social'),
      version: '428.0.0.0',
      size: '75 MB',
      downloads: 1800000,
      rating: 4.2,
      is_mod: true,
      mod_features: ['Reklamsız deneyim', 'Gelişmiş gizlilik'],
      description: 'Facebook MOD APK - Sosyal medya uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Meta'
    },
    {
      name: 'Candy Crush Saga',
      package_name: 'com.king.candycrushsaga',
      category_id: getCategoryId('games'),
      version: '1.255.0.3',
      size: '150 MB',
      downloads: 1000000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Sınırsız can', 'Sınırsız altın'],
      description: 'Candy Crush Saga MOD APK - Popüler bulmaca oyunu',
      icon_url: 'https://play-lh.googleusercontent.com/TLUeelx8wcpEzf3hoqeLxPs3ai1tdGtAZTIFkNqy3gbDp1NPpNFTOzSFJDvZ9narFS0=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '5.0 ve üzeri',
      developer: 'King'
    },
    {
      name: 'Subway Surfers',
      package_name: 'com.kiloo.subwaysurf',
      category_id: getCategoryId('games'),
      version: '3.21.0',
      size: '200 MB',
      downloads: 1200000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Sınırsız para', 'Tüm karakterler açık'],
      description: 'Subway Surfers MOD APK - Sonsuz koşu oyunu',
      icon_url: 'https://play-lh.googleusercontent.com/M-jxYVHzyaR9eX9N5Y7FtQqbW9hVsyQqxZ2TbBN-OHCL4ZBVhwzs_JNQXZgQA_HJEg=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '5.0 ve üzeri',
      developer: 'SYBO Games'
    },
    {
      name: 'Shazam',
      package_name: 'com.shazam.android',
      category_id: getCategoryId('music'),
      version: '15.12.0',
      size: '25 MB',
      downloads: 500000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Reklamsız', 'Premium özellikler'],
      description: 'Shazam MOD APK - Müzik tanıma uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/ROPZo4S0yaTtg8ONZklPzJZK5PAvwZNlJGR5X_qJkh_vVNg8QyBdBHHoX5Bva7Wv5g=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Apple Inc.'
    },
    {
      name: 'Disney+',
      package_name: 'com.disney.disneyplus',
      category_id: getCategoryId('video'),
      version: '2.26.0',
      size: '40 MB',
      downloads: 700000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Premium hesap', '4K streaming'],
      description: 'Disney+ MOD APK - Film ve dizi izleme platformu',
      icon_url: 'https://play-lh.googleusercontent.com/xoGGYH2LgLibLDBoxMg-ZE16b-RNfITw_OgXBWRAPin2FZY4FGB9QKBYApR-0rHCg-0=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Disney'
    },
    {
      name: 'Amazon Prime Video',
      package_name: 'com.amazon.avod.thirdpartyclient',
      category_id: getCategoryId('video'),
      version: '3.0.380',
      size: '35 MB',
      downloads: 600000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Premium üyelik', 'Reklamsız izleme'],
      description: 'Amazon Prime Video MOD APK - Film ve dizi izleme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/Y7drWZZo_F2GBE1RhjR1irOkE3yrtPorHS1U9YkLKAu1DnTjQ_KqKTRkt_QQazU-8Rw=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Amazon Mobile LLC'
    },
    {
      name: 'Twitch',
      package_name: 'tv.twitch.android.app',
      category_id: getCategoryId('video'),
      version: '16.1.0',
      size: '45 MB',
      downloads: 800000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Reklamsız izleme', 'Bits hilesi'],
      description: 'Twitch MOD APK - Canlı yayın platformu',
      icon_url: 'https://play-lh.googleusercontent.com/QLQzL-MXtxKEDlbhrQCDw-REiDsA9glUH4m16syfar_KVLRXlzOhN7tmAceiPerv4Jg=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Twitch Interactive, Inc.'
    },
    {
      name: 'Reddit',
      package_name: 'com.reddit.frontpage',
      category_id: getCategoryId('social'),
      version: '2024.06.0',
      size: '30 MB',
      downloads: 400000,
      rating: 4.4,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Reklamsız deneyim'],
      description: 'Reddit MOD APK - Sosyal medya platformu',
      icon_url: 'https://play-lh.googleusercontent.com/FDqBeRM5zerQVVAIYnkVVX8Z5CtxrX9J8iHdBMqgO3yF5Sc9O_1H3ZFLnkPKr_C6FHg=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Reddit Inc.'
    },
    {
      name: 'Duolingo',
      package_name: 'com.duolingo',
      category_id: getCategoryId('education'),
      version: '5.137.3',
      size: '25 MB',
      downloads: 300000,
      rating: 4.8,
      is_mod: true,
      mod_features: ['Sınırsız kalp', 'Premium özellikler'],
      description: 'Duolingo MOD APK - Dil öğrenme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/hSyebBlRqNhqhwEDxXKvXMJ9QJUzxP6wmDgxHE5woU-ooGpD2tM4-c0zyoqwrD3IqYc=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Duolingo'
    },
    {
      name: 'Strava',
      package_name: 'com.strava',
      category_id: getCategoryId('tools'),
      version: '324.0.0',
      size: '40 MB',
      downloads: 200000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Detaylı analizler'],
      description: 'Strava MOD APK - Spor ve fitness takip uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/j7YqWxhxKzwmwR5WgXg9qeXJFR8DTsb_8F7FiTEHxqiLz1dTDQZRxLF0MQyazKBn7g=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Strava Inc.'
    },
    {
      name: 'Calm',
      package_name: 'com.calm.android',
      category_id: getCategoryId('tools'),
      version: '6.38.0',
      size: '35 MB',
      downloads: 250000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Premium içerikler', 'Sınırsız meditasyon'],
      description: 'Calm MOD APK - Meditasyon ve uyku uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/TIGjK_QgPxm7qG_kHtFdT7qY9NGvPh_XtomKx5PfxHFV0YGD4V9yMwRmBo5zr3cJJQ=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Calm.com, Inc.'
    },
    {
      name: 'Microsoft Teams',
      package_name: 'com.microsoft.teams',
      category_id: getCategoryId('tools'),
      version: '1449.2024020501',
      size: '85 MB',
      downloads: 450000,
      rating: 4.4,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Sınırsız toplantı'],
      description: 'Microsoft Teams MOD APK - İş birliği uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/jKU64njy8urP89V1O63oR47XVLpC5HxvQD_eE8QEGVyxwaNE7mSF9Kw8s-HhhXpHj_M=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Microsoft Corporation'
    },
    {
      name: 'Zoom',
      package_name: 'us.zoom.videomeetings',
      category_id: getCategoryId('tools'),
      version: '5.17.0',
      size: '75 MB',
      downloads: 550000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Sınırsız toplantı'],
      description: 'Zoom MOD APK - Video konferans uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/yZsmiNjmji3ZoOuLthoVvptLB9cZ0vCmitcky4OUXNcEFV3IEQkrBD3T9uMv5YVrxB0=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '6.0 ve üzeri',
      developer: 'Zoom Video Communications, Inc.'
    },
    {
      name: 'Adobe Photoshop Express',
      package_name: 'com.adobe.psmobile',
      category_id: getCategoryId('tools'),
      version: '12.5.634',
      size: '55 MB',
      downloads: 350000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Tüm filtreler açık'],
      description: 'Adobe Photoshop Express MOD APK - Fotoğraf düzenleme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/IWNGx0yvXtHCxGGvJ4Pf5-XNZGqKQxwKGQX_WtzztXeHoYUxoWBp5yNaOUqgZQoung=w240-h480-rw',
      screenshots: ['url1', 'url2'],
      android_version: '7.0 ve üzeri',
      developer: 'Adobe'
    },
    {
      name: 'Minecraft',
      package_name: 'com.mojang.minecraftpe',
      category_id: getCategoryId('games'),
      version: '1.20.51.1',
      size: '150 MB',
      downloads: 1800000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Sınırsız elmas', 'Tüm skinler açık', 'God mode'],
      description: 'Minecraft MOD APK - Popüler sandbox oyunu',
      icon_url: 'https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/yQqtKzpLWvVnE7ZBXqkxNicIMR-W_4yPa-EGPBlGMRHqQA0ND8TuNw-ceDNsC2tAeQ=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/oDWpXO0KUxzqFbYvRGk7QfNvqn_BQnJfEtZqGGwU6VJZVTDRgXjQpg0YZwWgkXt9HPo=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/vSNQds6F5roxdOuoOKZxv-4zzh6yXIrXrnJeFaqhF_tD5kZnvq6TP6rYdxG3YCGiBg=w2560-h1440-rw'
      ],
      android_version: '5.0 ve üzeri',
      developer: 'Mojang'
    },
    {
      name: 'Snapchat Plus',
      package_name: 'com.snapchat.android',
      category_id: getCategoryId('social'),
      version: '12.85.0',
      size: '85 MB',
      downloads: 950000,
      rating: 4.3,
      is_mod: true,
      mod_features: ['Hikaye gizli izleme', 'Konum gizleme', 'Premium özellikler'],
      description: 'Snapchat Plus MOD APK - Fotoğraf ve mesajlaşma uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd6cTwfbqUJcbSRPe_IBVK_YmwckfMRS1VIHz-5cgT09yMo=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/Qv3TEkHKuONbZWqmkH3tIPvGFd6zM6wBY3-WNCIbYUhFw4GFi9sL6n0ETlxhXXCeT5w=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/Qi6VdTBO3LJqZjVznYN_T5M5E8_wR6pB7TbYrBJCy7K_2iR7OAn7V_KQPtOPqIYP=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/2eDKxUNJb6pbOGGOoG8NEgzP3vE6PPPqGWUxOhGcOhZg4xZgSYRXa8LEI-TMJ6J7ow=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'Snap Inc'
    },
    {
      name: 'Asphalt 9: Legends',
      package_name: 'com.gameloft.android.ANMP.GloftA9HM',
      category_id: getCategoryId('games'),
      version: '3.4.5a',
      size: '2.5 GB',
      downloads: 750000,
      rating: 4.4,
      is_mod: true,
      mod_features: ['Sınırsız nitro', 'Tüm arabalar açık', 'Sınırsız para'],
      description: 'Asphalt 9 MOD APK - En iyi yarış oyunu',
      icon_url: 'https://play-lh.googleusercontent.com/cw0x8EyZlsRwKhp4YN-LVHy0vHhk12DTxZtQxrP0jjpXgCkxD8O-pj60FDL-z2-kX_s=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/V1lb4J0yF-2K0eHOzHkqggsNP0-XzZgqeOL7Y9ZL7R-PSxNtBZHEKeLKQxpPtD6M_g=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/1IKGNXQxWXV8RYqvCJj4F6cYconservjcB2eB8VkzqhpH2qB_SkIOJ4LxGqF-hPKZ9Zg=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/TE_1_3aS1TqxE1ECztxZsqvVqM72ZWZHYiLNxEmqKX-8yLH4wQ5Z9UbHovS5CnN0Eg=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'Gameloft'
    },
    {
      name: 'Capcut Pro',
      package_name: 'com.lemon.lvoverseas',
      category_id: getCategoryId('tools'),
      version: '9.5.1',
      size: '90 MB',
      downloads: 650000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Premium efektler', 'Filigransız export', 'Tüm özellikler açık'],
      description: 'Capcut Pro MOD APK - Video düzenleme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/cF9up0GNcWOM6LzCGqK7O3HGgYQqxVyZqhN3VD_49MHRqKGk5RKb4N3voXTcRMoKa_g=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/7YlqI99cnGBwVH8HXb_IpkQheDDJoUtg-2O3qbbR8FnRPdo_UCYz2oGgR2ZK5sxLYA=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/Bf_3OBxGzYHcQJN6GnEtaQTEy8H_yZkZE2wEi-YUF_csYz3mqrj9LgYz64SZK1rYKQ=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/GYRqeC3_8GbCmxXqXHSJrqPuYH1C4dZKGQpFB3eR-K67D3GR_vWQJkZ8XxzZF-8KOw=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'ByteDance'
    },
    {
      name: 'Soundcloud',
      package_name: 'com.soundcloud.android',
      category_id: getCategoryId('music'),
      version: '2024.02.29',
      size: '45 MB',
      downloads: 450000,
      rating: 4.6,
      is_mod: true,
      mod_features: ['Offline dinleme', 'Yüksek kalite ses', 'Reklamsız'],
      description: 'Soundcloud MOD APK - Müzik ve podcast platformu',
      icon_url: 'https://play-lh.googleusercontent.com/lvYCdrPNFIu4Z8K3-n2UtO2zqg_MR4YV5Fu8S8JA0aL9jGtR6qn8tpMQqUSXzUUFnk8=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/AJCvmj4QFXeGHcQkrDhicHYYwO0_9JK7KvgXj9TtgxPdGE2TQPWEHaGh8p3EAMhUwQ=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/Ach7yHCUB1-U_3oQHGvHtJ5ynJFjMUGekO4XO5cJu0Xtk3MlVxMgN1v_g1-tbUxfgA=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/Oe9j82yh5VJIjMGCgN_CUxGhbQwqBMF_aa9DPFLzL_7-JKi4kR-uZEqWQm6RXwIp5A=w2560-h1440-rw'
      ],
      android_version: '5.0 ve üzeri',
      developer: 'SoundCloud'
    },
    {
      name: 'Kinemaster Pro',
      package_name: 'com.nexstreaming.app.kinemasterpro',
      category_id: getCategoryId('tools'),
      version: '7.3.4',
      size: '115 MB',
      downloads: 550000,
      rating: 4.5,
      is_mod: true,
      mod_features: ['Premium özellikler', 'Filigransız export', '4K desteği'],
      description: 'Kinemaster Pro MOD APK - Profesyonel video düzenleme uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/KpCXJqkkNBJr9M_ZqXm7IEY9eEzQxXDRzGU4g9p6-GUc0e6xAUG5Fs2poR6C_TfuXw=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/OXV2fh9S_E4Ib0GdCzHOXy5a0PONxZ_vvbs2LOqvDouchG_TWlExWXH-JQWE0KJ6BA=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/7_oQSJv2qcX1UJpYKRnZd_KQh9aCBZVeYbZY0p5xyYG2YI7-6-JfHhWGhTqd2o5Hqw=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/0vGuANaxjHOEm5L_K6PNTeWiZTDgXne9wUZk4nLPGHEk0GhXfWs_Nt5fJgzVzVGgwQ=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'NexStreaming Corp'
    },
    {
      name: 'GTA San Andreas',
      package_name: 'com.rockstargames.gtasa',
      category_id: getCategoryId('games'),
      version: '2.00',
      size: '2.2 GB',
      downloads: 850000,
      rating: 4.7,
      is_mod: true,
      mod_features: ['Sınırsız para', 'God mode', 'Tüm silahlar açık'],
      description: 'GTA San Andreas MOD APK - Efsanevi açık dünya oyunu',
      icon_url: 'https://play-lh.googleusercontent.com/XpTRQ-k7bPFS9tZLHyF2iB3KUVZ03KgZUoVhk0mpNR3UGbVNg2tDdM4GHGYkKKrb0V4=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/proxy/PLnMr_9zYR_K8wFxWXglKIpRweLH1pQKJ0uHHGMXKgwS4_I_GQeRJY8nGEJ3HC1N2HpLLOBok3IxZXrzF4PQQv-Tg4ku2eqd=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/proxy/vOE3GHfz6pWIBhg65Yw6S5ou5NGZg_cxHIVR4eZ-1sH_QIwHk3OANPXtJdGHvgkD5oB2JxnI4XQ1G3UKPDZPQVNdjLIQxVE=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/proxy/Iy_nHCJcKL_vwZZhNFXvDjgDOKONJmObv1Kl1DZxkpOxHx9RnC5KOernS5Cl-0RAOOEfF9oZfF0iHLFOQPYGYZv-kXE=w2560-h1440-rw'
      ],
      android_version: '7.0 ve üzeri',
      developer: 'Rockstar Games'
    },
    {
      name: 'Canva Pro',
      package_name: 'com.canva.editor',
      category_id: getCategoryId('tools'),
      version: '3.23.0',
      size: '75 MB',
      downloads: 600000,
      rating: 4.8,
      is_mod: true,
      mod_features: ['Premium şablonlar', 'Stok fotoğraflar', 'Pro özellikler'],
      description: 'Canva Pro MOD APK - Grafik tasarım uygulaması',
      icon_url: 'https://play-lh.googleusercontent.com/3aWGqSf3T_p3F6wc8FFvcZcnjWlxpZdNaqFVEvPAi0B023qsqMLTExhNKLDtGQMXvQ=s180-rw',
      screenshots: [
        'https://play-lh.googleusercontent.com/ace-0B6x-7hN5KPPv_OqQw_BUzYLpM6G_SHHvBlenxj2Yp_4ZL6LuQYGXI8Pq9wFeqo=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/2t1vNl5MsQ-Gv_3VD9lVwFVc_2oW0D9zEiEz2TSiYxjVYYJ8rLNx8CkAZpSi_8zgNA=w2560-h1440-rw',
        'https://play-lh.googleusercontent.com/yNwkK2mCyFWjqXzAHPl-Wv_ohZfONNmhzXPi9H6KF6vxEmbwRuR6_A8GwBVL-QpHsA=w2560-h1440-rw'
      ],
      android_version: '6.0 ve üzeri',
      developer: 'Canva'
    }
  ]

  const { data, error } = await supabase
    .from('apps')
    .upsert(apps, { onConflict: 'package_name' })
    .select()

  if (error) {
    console.error('Uygulamalar eklenirken hata:', error)
    return
  }

  console.log('Uygulamalar başarıyla eklendi:', data)
}

export async function seed() {
  try {
    console.log('Kategoriler ekleniyor...')
    const categories = await seedCategories()
    console.log('Kategoriler başarıyla eklendi:', categories)

    console.log('\nUygulamalar ekleniyor...')
    const apps = await seedApps()
    console.log('Uygulamalar başarıyla eklendi:', apps)

    console.log('\nTüm veriler başarıyla eklendi!')
  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error)
  }
}

// Script'i çalıştır
seed() 