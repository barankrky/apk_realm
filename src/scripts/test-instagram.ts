import { APKComboScraper } from '../lib/scraper/sources/apkcombo'

async function main() {
  const scraper = new APKComboScraper()
  
  console.log('🔍 Instagram araması yapılıyor...')
  const searchResults = await scraper.searchApp('instagram', 3)
  
  if (searchResults.length > 0) {
    console.log('✅ Arama sonuçları:')
    console.log(JSON.stringify(searchResults, null, 2))

    // İlk sonucun detaylarını getir
    console.log(`\n📱 İlk sonucun (${searchResults[0].name}) detayları getiriliyor...`)
    const appDetails = await scraper.getAppDetails(searchResults[0].package_name)
    
    if (appDetails) {
      console.log('✅ Uygulama detayları:')
      console.log(JSON.stringify(appDetails, null, 2))
    } else {
      console.log('❌ Uygulama detayları alınamadı')
    }
  } else {
    console.log('❌ Arama sonucu bulunamadı')
  }
}

main().catch(console.error) 