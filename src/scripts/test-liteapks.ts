import { LiteAPKsScraper } from '../lib/scraper/sources/liteapks'

async function main() {
  const scraper = new LiteAPKsScraper()
  
  const url = 'https://liteapks.com/spotify-2.html'
  console.log(`🔍 URL'den uygulama bilgileri getiriliyor: ${url}`)
  
  const app = await scraper.getAppFromUrl(url)
  
  if (app) {
    console.log('✅ Uygulama detayları:')
    console.log(JSON.stringify(app, null, 2))
  } else {
    console.log('❌ Uygulama bilgileri alınamadı')
  }
}

main().catch(console.error) 