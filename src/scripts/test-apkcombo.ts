import { APKComboScraper } from '../lib/scraper/sources/apkcombo'

async function main() {
  console.log('🔍 APKCombo test başlatılıyor...')
  
  const scraper = new APKComboScraper()
  console.log('⌛ Scraper başlatılıyor...')
  await scraper.init()
  console.log('✅ Scraper başlatıldı')

  try {
    console.log('📱 Gmail detayları alınıyor...')
    const app = await scraper.getAppDetails('com.google.android.gm')
    
    if (app) {
      console.log('\n✅ Uygulama detayları:')
      console.log(`📱 İsim: ${app.name}`)
      console.log(`📦 Paket: ${app.package_name}`)
      console.log(`📱 Versiyon: ${app.version}`)
      console.log(`💾 Boyut: ${app.size}`)
      console.log(`👨‍💻 Geliştirici: ${app.developer}`)
      console.log(`📝 Açıklama: ${app.description}`)
      console.log(`🔗 İkon: ${app.icon_url}`)
      console.log(`⬇️ İndirme: ${app.downloads}`)
      console.log(`⭐ Puan: ${app.rating}`)
      
      if (app.screenshots.length > 0) {
        console.log('\n🖼️ Ekran Görüntüleri:')
        app.screenshots.forEach((url, index) => {
          console.log(`${index + 1}. ${url}`)
        })
      }

      if (app.variants.length > 0) {
        console.log('\n📦 APK Varyantları:')
        app.variants.forEach((variant, index) => {
          console.log(`\n${index + 1}. ${variant.name}`)
          console.log(`   📱 Versiyon: ${variant.version}`)
          console.log(`   💾 Boyut: ${variant.size}`)
          console.log(`   🔧 Tip: ${variant.type}`)
          console.log(`   🔗 Link: ${variant.download_link}`)
          if (variant.notes) {
            console.log(`   📝 Not: ${variant.notes}`)
          }
        })
      }
    } else {
      console.log('❌ Uygulama bulunamadı')
    }
  } catch (error) {
    console.error('❌ Test sırasında hata:', error)
  } finally {
    console.log('\n⌛ Scraper kapatılıyor...')
    await scraper.close()
    console.log('✅ Scraper kapatıldı')
  }
}

main() 