import { APKComboScraper } from '../lib/scraper/sources/apkcombo'

async function main() {
  const scraper = new APKComboScraper()
  
  const url = 'https://apkcombo.app/tr/instagram/com.instagram.android/'
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