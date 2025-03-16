import { BaseScraper } from '../base'
import { ScrapedApp } from '../types'

export class APKMirrorScraper extends BaseScraper {
  constructor() {
    super('APKMirror', 'https://www.apkmirror.com', true, false)
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
      await page.goto(`${this.baseUrl}/uploads`, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })

      // Uygulama kartlarını seç
      const appCards = await page.$$('.listWidget')
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
      console.error('APKMirror scraping error:', error)
    }

    return apps
  }

  private async scrapeApp(card: any): Promise<ScrapedApp | null> {
    try {
      const page = await this.getPage()

      const name = await page.evaluate(
        el => {
          const titleEl = el.querySelector('.appRowTitle')
          return titleEl?.textContent?.trim().split(' ')[0] || ''
        },
        card
      )

      const version = await page.evaluate(
        el => {
          const titleEl = el.querySelector('.appRowTitle')
          const text = titleEl?.textContent?.trim() || ''
          const match = text.match(/\d+(\.\d+)*/)
          return match ? match[0] : '1.0'
        },
        card
      )

      const developer = await page.evaluate(
        el => el.querySelector('.byDeveloper')?.textContent?.replace('by ', '').trim() || 'Unknown',
        card
      )

      const detailUrl = await page.evaluate(
        el => el.querySelector('.appRowTitle a')?.href || '',
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
        '.appspec-value',
        el => {
          const text = el.textContent?.trim() || ''
          return text.includes('Package:') ? text.replace('Package:', '').trim() : ''
        }
      ).catch(() => '')

      if (!packageName) {
        console.log('Paket adı bulunamadı')
        await detailPage.close()
        return null
      }

      const size = await detailPage.$eval(
        '.appspec-row',
        el => {
          const text = el.textContent?.trim() || ''
          const match = text.match(/(\d+(\.\d+)?\s*(MB|KB|GB))/i)
          return match ? match[0] : '0 MB'
        }
      ).catch(() => '0 MB')

      const description = await detailPage.$eval(
        '.notes',
        el => el.textContent?.trim() || ''
      ).catch(() => '')

      const iconUrl = await detailPage.$eval(
        '.app-icon img',
        el => (el as HTMLImageElement).src || ''
      ).catch(() => '')
      
      // Ekran görüntülerini al
      const screenshots = await detailPage.evaluate(() => {
        return Array.from(document.querySelectorAll('.screenshots img'))
          .map(img => (img as HTMLImageElement).src)
          .filter(src => src)
      }).catch(() => [])

      const app: ScrapedApp = {
        name,
        package_name: packageName,
        version,
        size: this.formatSize(size),
        developer,
        description,
        icon_url: iconUrl,
        screenshots,
        download_links: [],
        is_mod: false,
        mod_features: [],
        category: 'Apps',
        rating: 0,
        downloads: 0
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
      const url = `${this.baseUrl}/apk/${packageName}/${packageName}-${version}-release/`
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
        '.downloadButton',
        el => el.getAttribute('href') || ''
      ).catch(() => '')

      return downloadUrl ? `${this.baseUrl}${downloadUrl}` : null
    } catch (error) {
      console.error('İndirme linki alınırken hata:', error)
      return null
    }
  }
} 