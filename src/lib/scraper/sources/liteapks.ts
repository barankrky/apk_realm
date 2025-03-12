import { BaseScraper } from '../base'
import { ScrapedApp } from '../types'

interface APKVariant {
  name: string
  version: string
  size: string
  type: string
  download_link: string
  notes?: string
}

export class LiteAPKsScraper extends BaseScraper {
  constructor() {
    super(
      'LiteAPKs',
      'https://liteapks.com',
      true,
      true
    )
  }

  // Base class'tan gelen abstract metot
  async scrape(): Promise<ScrapedApp[]> {
    return [] // Admin panelinden yönetileceği için boş dönüyoruz
  }

  // Uygulama ara ve ilk 3 sonucu getir
  async searchApp(query: string, limit: number = 3): Promise<ScrapedApp[]> {
    try {
      const apps: ScrapedApp[] = []
      const searchUrl = `${this.baseUrl}/search/${encodeURIComponent(query)}`
      await this.navigateTo(searchUrl)

      const page = await this.getPage()
      const appCards = await page.$$('.archive-post')
      const limitedCards = appCards.slice(0, limit)

      for (const card of limitedCards) {
        try {
          const name = await card.$eval('.h6', el => el.textContent?.trim() || '')
          const href = await card.evaluate(el => el.getAttribute('href') || '')
          const packageName = href.split('/').filter(Boolean).pop()?.replace('.html', '') || ''
          const iconUrl = await card.$eval('img', el => el.getAttribute('src') || '')
          
          const authorText = await card.$eval('.small:nth-child(2)', el => el.textContent?.trim() || '')
          const [developer, category] = authorText.split(' · ')
          
          const sizeText = await card.$eval('.small:nth-child(1)', el => el.textContent?.trim() || '')
          const size = sizeText.split(' + ')[1] || ''

          apps.push({
            name,
            package_name: packageName,
            version: '',
            size,
            developer,
            description: '',
            icon_url: iconUrl,
            screenshots: [],
            download_links: [],
            is_mod: true,
            mod_features: [],
            category,
            rating: 0,
            downloads: 0,
            latest_update: '',
            variants: [] // Boş varyant listesi
          })
        } catch (error) {
          console.error('⚠️ Arama sonucu işlenirken hata:', error)
          continue
        }
      }

      return apps

    } catch (error) {
      console.error('❌ Uygulama arama hatası:', error)
      return []
    }
  }

  // İndirme linklerini ve APK varyantlarını getir
  private async getDownloadVariants(downloadPageLink: string): Promise<{ downloadLinks: string[], variants: APKVariant[] }> {
    try {
      // İndirme sayfasına git
      console.log('⌛ İndirme sayfası yükleniyor...')
      await this.navigateTo(downloadPageLink)
      await this.delay(5000)

      const downloadLinks: string[] = []
      const variants: APKVariant[] = []

      // Her bir varyant grubu için
      const variantGroups = await this.page?.$$('.border.rounded.mb-2') || []
      
      for (const group of variantGroups) {
        try {
          // Varyant grubu adını al
          const groupName = await group.$eval('.h6.font-weight-semibold', el => el.textContent?.trim() || '')
          console.log(`\n📦 ${groupName}:`)

          // Varsa notları al
          const notes = await group.$eval('.small.bg-light.p-3', el => el.textContent?.trim() || '').catch(() => '')
          if (notes) {
            console.log(`📝 Notlar: ${notes}`)
          }

          // İndirme butonlarını al
          const buttons = await group.$$('.btn.btn-light.btn-sm.btn-block')
          for (const button of buttons) {
            const href = await button.evaluate(el => el.getAttribute('href') || '')
            const versionInfo = await button.$eval('.text-muted', el => el.textContent?.trim() || '')
            const size = await button.$eval('.text-muted.d-block.ml-auto', el => el.textContent?.trim() || '')

            if (href) {
              downloadLinks.push(href)
              
              // Versiyon bilgisini parçala (örn: "v9.0.28.4 - Premium/Amoled")
              const [version, type] = versionInfo.split(' - ')
              
              variants.push({
                name: groupName,
                version: version.replace('v', ''),
                type: type || '',
                size,
                download_link: href,
                notes: notes || undefined
              })

              console.log(`  ✓ ${versionInfo} (${size})`)
            }
          }
        } catch (error) {
          console.error('⚠️ Varyant grubu işlenirken hata:', error)
          continue
        }
      }

      return { downloadLinks, variants }

    } catch (error) {
      console.error('❌ İndirme varyantları alınırken hata:', error)
      return { downloadLinks: [], variants: [] }
    }
  }

  // Belirli bir uygulamanın detaylarını getir
  async getAppDetails(packageName: string): Promise<ScrapedApp | null> {
    try {
      const appUrl = `${this.baseUrl}/${packageName}.html`
      console.log(`📱 ${packageName} detayları alınıyor...`)
      console.log(`🔗 URL: ${appUrl}`)
      
      await this.navigateTo(appUrl)
      await this.delay(5000)

      console.log('⌛ Sayfa yükleniyor...')
      await this.page?.waitForSelector('article.bg-white', { timeout: 60000 })
      console.log('✅ Sayfa yüklendi')

      // Play Store linkinden paket ismini al
      const playStoreLink = await this.getAttribute('.table a[href*="play.google.com"]', 'href') || ''
      const appPackageName = playStoreLink.match(/id=(.*?)(&|$)/)?.at(1) || ''
      console.log(`📦 Paket İsmi: ${appPackageName}`)

      console.log('📝 Uygulama bilgileri alınıyor...')
      const nameText = await this.getText('h1.h2.font-weight-bold') || ''
      const name = nameText.replace(/\s+/g, ' ').trim()
      console.log(`📱 İsim: ${name}`)
      
      const iconUrl = await this.getAttribute('.rounded-lg.d-block.object-cover', 'src') || ''
      const version = await this.getText('.table tr:nth-child(5) td') || ''
      console.log(`📦 Versiyon: ${version}`)
      
      const developer = await this.getText('.table tr:nth-child(2) td a') || ''
      console.log(`👨‍💻 Geliştirici: ${developer}`)
      
      const category = await this.getText('.table tr:nth-child(3) td a') || ''
      const description = await this.getText('.small.bg-light.rounded.pt-3.px-3.mb-3 p') || ''
      const size = await this.getText('.table tr:nth-child(4) td') || ''
      console.log(`📏 Boyut: ${size}`)
      
      const downloads = parseInt((await this.getText('.rating + span'))?.replace(/[^0-9]/g, '') || '0')
      console.log(`⬇️ İndirme: ${downloads}`)
      
      const rating = parseFloat((await this.getText('.rating + span'))?.split('/')[0] || '0')
      console.log(`⭐ Puan: ${rating}`)

      // Son güncelleme tarihini al
      const latestUpdateText = await this.getText('time.d-block em.align-middle') || ''
      const latestUpdate = latestUpdateText.replace(/\s+/g, ' ').trim()
      console.log(`📅 Son Güncelleme: ${latestUpdate}`)

      // Mod özellikleri
      console.log('🔧 Mod özellikleri alınıyor...')
      const modFeatures = await this.page?.$$eval('#more-info-1 .pt-3.px-3 ul li, #more-info-1 .pt-3.px-3 p', 
        elements => elements.map(el => el.textContent?.trim() || '')
      ) || []
      console.log(`✅ ${modFeatures.length} mod özelliği bulundu`)

      // Screenshot URLs - TODO: Ekran görüntüleri için yeni selektör eklenecek
      const screenshots: string[] = []

      // İndirme linklerini ve varyantları al
      console.log('🔗 İndirme linkleri alınıyor...')
      const downloadPageLink = await this.getAttribute('.btn.btn-primary.btn-block', 'href') || ''
      
      if (downloadPageLink) {
        const { downloadLinks, variants } = await this.getDownloadVariants(downloadPageLink)
        console.log(`\n✅ Toplam ${variants.length} APK varyantı bulundu`)

        const app: ScrapedApp = {
          name,
          package_name: appPackageName,
          version,
          size,
          developer,
          description,
          icon_url: iconUrl,
          screenshots,
          download_links: downloadLinks,
          is_mod: true,
          mod_features: modFeatures,
          category,
          rating,
          downloads,
          latest_update: latestUpdate,
          variants // APK varyantlarını da ekle
        }

        console.log('✅ Uygulama detayları başarıyla alındı')
        return app
      }

      const app: ScrapedApp = {
        name,
        package_name: appPackageName,
        version,
        size,
        developer,
        description,
        icon_url: iconUrl,
        screenshots,
        download_links: [],
        is_mod: true,
        mod_features: modFeatures,
        category,
        rating,
        downloads,
        latest_update: latestUpdate,
        variants: [] // Boş varyant listesi
      }

      console.log('✅ Uygulama detayları başarıyla alındı')
      return app

    } catch (error) {
      console.error(`❌ ${packageName} detayları alınırken hata:`, error)
      return null
    }
  }

  // Link'ten uygulama bilgilerini getir
  async getAppFromUrl(url: string): Promise<ScrapedApp | null> {
    try {
      // URL'den paket adını çıkar
      const packageName = url.split('/').filter(Boolean).pop()?.replace('.html', '') || ''
      if (!packageName) {
        throw new Error('Geçersiz LiteAPKs URL')
      }

      // Detayları getir
      return await this.getAppDetails(packageName)

    } catch (error) {
      console.error(`❌ URL'den uygulama bilgileri alınırken hata:`, error)
      return null
    }
  }
} 