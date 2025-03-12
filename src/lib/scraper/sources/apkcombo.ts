import { BaseScraper } from '../base'
import { ScrapedApp } from '../types'

interface APKVariant {
  version: string
  version_code: string
  type: string
  size: string
  min_android: string
  dpi: string
  download_url: string
  architectures: string[]
}

export class APKComboScraper extends BaseScraper {
  constructor() {
    super(
      'APKCombo',
      'https://apkcombo.app',
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
      const searchUrl = `${this.baseUrl}/tr/search/${encodeURIComponent(query)}`
      await this.navigateTo(searchUrl)

      const page = await this.getPage()
      const appCards = await page.$$('.content.content-apps .l_item')
      const limitedCards = appCards.slice(0, limit)

      for (const card of limitedCards) {
        try {
          const name = await card.$eval('.info .name', el => el.textContent?.trim() || '')
          const href = await card.evaluate(el => el.getAttribute('href') || '')
          const packageName = href.split('/').filter(Boolean).pop()?.replace('/', '') || ''
          const iconUrl = await card.$eval('figure img', el => el.getAttribute('src') || '')
          
          const authorText = await card.$eval('.info .author', el => el.textContent?.trim() || '')
          const [developer, category] = authorText.split(' · ')
          
          const descriptionText = await card.$eval('.info .description', el => el.textContent?.trim() || '')
          const [downloads, rating, size] = descriptionText.split(' ')
            .map(part => part.trim())
            .filter(Boolean)
          
          const ratingValue = parseFloat(rating?.replace('★', '') || '0')
          const downloadsValue = parseInt(downloads?.replace(/[^0-9]/g, '') || '0')

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
            is_mod: false,
            mod_features: [],
            category,
            rating: ratingValue,
            downloads: downloadsValue
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

  // Belirli bir uygulamanın detaylarını getir
  async getAppDetails(packageName: string): Promise<ScrapedApp | null> {
    if (!this.browser) {
      console.error('Browser başlatılamadı');
      return null;
    }

    const page = await this.browser.newPage();
    
    try {
      const appUrl = `${this.baseUrl}/tr/app/${packageName}`
      console.log(`📱 ${packageName} detayları alınıyor...`)
      console.log(`🔗 URL: ${appUrl}`)
      
      await page.goto(appUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      console.log('⌛ Sayfa yükleniyor...')
      await page.waitForSelector('.app_header', { timeout: 60000 })
      console.log('✅ Sayfa yüklendi')

      // Temel bilgileri al
      console.log('📝 Uygulama bilgileri alınıyor...')
      const name = await page.$eval('.app_header .app_name h1', el => el.textContent?.trim()) || ''
      console.log(`📱 İsim: ${name}`)
      
      const iconUrl = await page.$eval('.app_header .avatar img', el => el.getAttribute('src')) || ''
      const developer = await page.$eval('.app_header .info .author a', el => el.textContent?.trim()) || ''
      console.log(`👨‍💻 Geliştirici: ${developer}`)
      
      const version = await page.$eval('.app_header .info .version', el => el.textContent?.trim()) || ''
      console.log(`📦 Versiyon: ${version}`)
      
      const description = await page.$eval('.short-description', el => el.textContent?.trim()) || ''
      const category = await page.$eval('.tags a[href^="/tr/category/"]', el => el.textContent?.trim()) || ''
      const size = await page.$eval('.button.is-success .fsize span', el => el.textContent?.trim()) || ''
      console.log(`📏 Boyut: ${size}`)
      
      // İstatistikler
      const downloads = parseInt((await page.$eval('.information-table .item:nth-child(6) .value', el => el.textContent?.trim()))?.replace(/[^0-9]/g, '') || '0')
      console.log(`⬇️ İndirme: ${downloads}`)
      
      // Screenshot URLs
      console.log('🖼️ Ekran görüntüleri alınıyor...')
      const screenshots = await page.$$eval('#gallery-screenshots img', 
        imgs => imgs.map(img => img.getAttribute('src') || '')
      ) || []
      console.log(`✅ ${screenshots.length} ekran görüntüsü bulundu`)

      // İndirme linkini al
      console.log('🔗 İndirme linki alınıyor...')
      const downloadButton = await page.$('.button.is-success')
      if (downloadButton) {
        const downloadLink = await downloadButton.evaluate(el => el.getAttribute('href')) || ''
        if (downloadLink) {
          const downloadPageUrl = `${this.baseUrl}${downloadLink}`
          console.log(`🔗 İndirme sayfası: ${downloadPageUrl}`)

          // İndirme sayfasına git
          await page.goto(downloadPageUrl, {
            waitUntil: 'networkidle0',
            timeout: 60000
          });

          // APK varyantlarını al
          console.log('📦 APK varyantları alınıyor...')
          const variants = await this.getAPKVariants(page)
          console.log(`✅ ${variants.length} APK varyantı bulundu`)

          const app: ScrapedApp = {
            name,
            package_name: packageName,
            version,
            size,
            developer,
            description,
            icon_url: iconUrl,
            screenshots,
            download_links: variants.map(v => v.download_url),
            is_mod: false,
            mod_features: [],
            category,
            rating: 0,
            downloads,
            variants: variants.map(v => ({
              name: v.type,
              version: v.version,
              type: v.type,
              size: v.size,
              download_link: v.download_url,
              notes: `Android ${v.min_android}+, ${v.dpi}, ${v.architectures.join(', ')}`
            }))
          }

          console.log('✅ Uygulama detayları başarıyla alındı')
          return app
        }
      }

      // İndirme linki bulunamadıysa
      const app: ScrapedApp = {
        name,
        package_name: packageName,
        version,
        size,
        developer,
        description,
        icon_url: iconUrl,
        screenshots,
        download_links: [],
        is_mod: false,
        mod_features: [],
        category,
        rating: 0,
        downloads,
        variants: []
      }

      console.log('✅ Uygulama detayları başarıyla alındı')
      return app

    } catch (error) {
      console.error(`❌ ${packageName} detayları alınırken hata:`, error)
      return null
    } finally {
      await page.close()
    }
  }

  // Popüler uygulamalardan ilk 5'ini getir
  async getTopFiveApps(): Promise<ScrapedApp[]> {
    try {
      const apps: ScrapedApp[] = []
      
      await this.navigateTo(`${this.baseUrl}/tr/category/app/top-popular`)
      const page = await this.getPage()

      // İlk 5 uygulama kartını seç
      const appCards = await page.$$('a.l_item')
      const firstFiveCards = appCards.slice(0, 5)

      for (const card of firstFiveCards) {
        try {
          const name = await card.$eval('.info .name', el => el.textContent?.trim() || '')
          const href = await card.evaluate(el => el.getAttribute('href') || '')
          const packageName = href.split('/').filter(Boolean).pop()?.replace('/', '') || ''
          const iconUrl = await card.$eval('figure img', el => el.getAttribute('src') || '')
          
          const authorText = await card.$eval('.info .author', el => el.textContent?.trim() || '')
          const [developer, category] = authorText.split(' · ')
          
          const descriptionText = await card.$eval('.info .description', el => el.textContent?.trim() || '')
          const [downloads, rating, size] = descriptionText.split(' ')
            .map(part => part.trim())
            .filter(Boolean)
          
          const ratingValue = parseFloat(rating?.replace('★', '') || '0')
          const downloadsValue = parseInt(downloads?.replace(/[^0-9]/g, '') || '0')

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
            is_mod: false,
            mod_features: [],
            category,
            rating: ratingValue,
            downloads: downloadsValue
          })
        } catch (error) {
          console.error('⚠️ Uygulama bilgileri çekilirken hata:', error)
          continue
        }
      }

      return apps

    } catch (error) {
      console.error('❌ Popüler uygulamalar alınırken hata:', error)
      return []
    }
  }

  // İndirme linkini getir
  async getDownloadLink(packageName: string, version: string): Promise<string | null> {
    try {
      const appUrl = `${this.baseUrl}/tr/app/${packageName}`
      await this.navigateTo(appUrl)

      if (await this.exists('.button.is-success')) {
        const downloadLink = await this.getAttribute('.button.is-success', 'href')
        
        if (downloadLink) {
          const downloadPageUrl = `${this.baseUrl}${downloadLink}`
          await this.navigateTo(downloadPageUrl)

          const variants = await this.getAPKVariants()
          if (variants.length > 0) {
            return variants[0].download_url
          }
        }
      }

      return null

    } catch (error) {
      console.error('❌ İndirme linki alınırken hata:', error)
      return null
    }
  }

  // APK varyantlarını getir
  private async getAPKVariants(page: any): Promise<APKVariant[]> {
    const variants: APKVariant[] = []

    try {
      const variantGroups = await page.$$('.content-tab-latest-version .tree')
      
      for (const group of variantGroups) {
        try {
          const architecturesText = await group.$eval('ul.mb-0 > li > span.blur code', el => el.textContent?.trim() || '')
          const architectures = architecturesText.split(', ')

          const variantList = await group.$$('.file-list > li')
          
          for (const variant of variantList) {
            try {
              const link = await variant.$('a.variant')
              if (!link) continue

              const downloadUrl = await link.evaluate(el => el.getAttribute('href') || '')
              const version = await variant.$eval('.info .header .vername', el => el.textContent?.trim() || '')
              const versionCode = await variant.$eval('.info .header .vercode', el => el.textContent?.replace(/[()]/g, '').trim() || '')
              const type = await variant.$eval('.info .header .vtype span', el => el.textContent?.trim() || '')
              const size = await variant.$eval('.info .description .spec:nth-child(1)', el => el.textContent?.trim() || '')
              const minAndroid = await variant.$eval('.info .description .spec:nth-child(2)', el => el.textContent?.replace('Android', '').trim() || '')
              const dpi = await variant.$eval('.info .description .spec:nth-child(3)', el => el.textContent?.trim() || '')

              variants.push({
                version,
                version_code: versionCode,
                type,
                size,
                min_android: minAndroid,
                dpi,
                download_url: downloadUrl,
                architectures
              })

              console.log(`  ✓ ${version} - ${type} (${size})`)
            } catch (error) {
              console.error('⚠️ APK varyantı işlenirken hata:', error)
              continue
            }
          }
        } catch (error) {
          console.error('⚠️ Varyant grubu işlenirken hata:', error)
          continue
        }
      }

      return variants

    } catch (error) {
      console.error('❌ APK varyantları alınırken hata:', error)
      return []
    }
  }

  // Link'ten uygulama bilgilerini getir
  async getAppFromUrl(url: string): Promise<ScrapedApp | null> {
    try {
      // URL'den paket adını çıkar
      const packageName = url.split('/').filter(Boolean).pop()?.replace('/', '') || ''
      if (!packageName) {
        throw new Error('Geçersiz APKCombo URL')
      }

      // Detayları getir
      return await this.getAppDetails(packageName)

    } catch (error) {
      console.error(`❌ URL'den uygulama bilgileri alınırken hata:`, error)
      return null
    }
  }
} 