import { BaseScraper } from '../base'
import { ScrapedApp } from '../types'

export class APKPureScraper extends BaseScraper {
  constructor() {
    super('APKPure', 'https://apkpure.com', true, false)
  }

  async scrape(): Promise<ScrapedApp[]> {
    const apps: ScrapedApp[] = []
    
    try {
      await this.init()
      const page = await this.getPage()

      // Tarayıcı parmak izini gizle
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
      })

      // Ana sayfaya git
      console.log('Ana sayfa yükleniyor...')
      await page.goto(`${this.baseUrl}/tr/app-game`, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })

      // Uygulama kartlarını seç
      const appCards = await page.$$('div.category-template-down')
      console.log(`${appCards.length} uygulama kartı bulundu`)

      for (const card of appCards.slice(0, 5)) { // İlk 5 uygulamayı al
        const app = await this.scrapeApp(card)
        if (app) {
          apps.push(app)
          console.log(`Uygulama bilgileri alındı: ${app.name}`)
        }
        await this.delay(2000)
      }
    } catch (error) {
      console.error('APKPure scraping error:', error)
    }

    return apps
  }

  private async scrapeApp(card: any): Promise<ScrapedApp | null> {
    try {
      const page = await this.getPage()

      const name = await page.evaluate(
        el => el.querySelector('.category-template-title')?.textContent?.trim() || '',
        card
      )

      const detailUrl = await page.evaluate(
        el => el.querySelector('a.category-template-down')?.href || '',
        card
      )

      if (!detailUrl || !name) {
        console.log('İsim veya detay URL\'i bulunamadı')
        return null
      }

      console.log(`${name} için detaylar alınıyor...`)

      // Detay sayfasına git
      const detailPage = await this.browser?.newPage()
      if (!detailPage) {
        console.log('Yeni sayfa açılamadı')
        return null
      }

      // Tarayıcı parmak izini gizle
      await detailPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
      await detailPage.setExtraHTTPHeaders({
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
      })

      await detailPage.goto(detailUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })
      await this.delay(2000)

      const packageName = await detailPage.$eval(
        'span[itemprop="applicationId"]',
        el => el.textContent?.trim() || ''
      ).catch(() => '')

      if (!packageName) {
        console.log('Paket adı bulunamadı')
        await detailPage.close()
        return null
      }

      const version = this.formatVersion(
        await detailPage.$eval(
          'span[itemprop="softwareVersion"]',
          el => el.textContent?.trim() || '1.0'
        ).catch(() => '1.0')
      )

      const size = this.formatSize(
        await detailPage.$eval(
          'span[itemprop="fileSize"]',
          el => el.textContent?.trim() || '0 MB'
        ).catch(() => '0 MB')
      )

      const developer = await detailPage.$eval(
        'span[itemprop="author"] span[itemprop="name"]',
        el => el.textContent?.trim() || 'Unknown'
      ).catch(() => 'Unknown')

      const description = await detailPage.$eval(
        'div[itemprop="description"]',
        el => el.textContent?.trim() || ''
      ).catch(() => '')

      const iconUrl = await detailPage.$eval(
        'img.icon',
        el => (el as HTMLImageElement).src || ''
      ).catch(() => '')
      
      // Ekran görüntülerini al
      const screenshots = await detailPage.evaluate(() => {
        return Array.from(document.querySelectorAll('div.thumbnail img'))
          .map(img => (img as HTMLImageElement).src)
          .filter(src => src)
      }).catch(() => [])

      const rating = await detailPage.$eval(
        'span[itemprop="ratingValue"]',
        el => el.textContent?.trim() || '0'
      ).catch(() => '0')

      const downloads = await detailPage.$eval(
        'span[itemprop="downloadCount"]',
        el => el.textContent?.trim() || '0'
      ).catch(() => '0')

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
        category: 'Apps',
        rating: parseFloat(rating),
        downloads: parseInt(downloads.replace(/[^0-9]/g, '')) || 0
      }

      console.log('Uygulama detayları alındı:', app)
      await detailPage.close()
      return app
    } catch (error) {
      console.error('Uygulama bilgileri alınırken hata:', error)
      return null
    }
  }

  async getDownloadLink(packageName: string, version: string): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/tr/${packageName}`
      const page = await this.getPage()

      // Tarayıcı parmak izini gizle
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
      })

      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })
      await this.delay(2000)
      
      const downloadUrl = await page.$eval(
        'a.download-start',
        el => el.getAttribute('href') || ''
      ).catch(() => '')

      return downloadUrl || null
    } catch (error) {
      console.error('İndirme linki alınırken hata:', error)
      return null
    }
  }
} 