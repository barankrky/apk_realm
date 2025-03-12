import { LiteAPKsScraper } from '../lib/scraper/sources/liteapks'

async function main() {
  console.log('🔍 LiteAPKs test başlatılıyor...')
  
  const scraper = new LiteAPKsScraper()
  console.log('⌛ Scraper başlatılıyor...')
  await scraper.init()
  console.log('✅ Scraper başlatıldı')

  try {
    console.log('📱 Spotify detayları alınıyor...')
    const app = await scraper.getAppDetails('spotify-2')
    
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
      console.log(`📅 Son Güncelleme: ${app.latest_update}`)
      
      if (app.mod_features.length > 0) {
        console.log('\n🔧 Mod Özellikleri:')
        app.mod_features.forEach((feature, index) => {
          console.log(`${index + 1}. ${feature}`)
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