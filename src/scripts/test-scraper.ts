import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Browser, Page } from 'puppeteer'

// Stealth plugin'i ekle
puppeteer.use(StealthPlugin())

async function main() {
  let browser: Browser | null = null
  let page: Page | null = null

  try {
    console.log('Scraping testi başlatılıyor...')

    // Browser'ı başlat
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080'
      ]
    })

    // Yeni sayfa aç
    page = await browser.newPage()

    // Viewport ayarları
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    })

    // User agent ayarla
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    // HTTP başlıkları
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1'
    })

    // Test siteleri
    const TEST_SITES = [
      'https://apkcombo.com',
      'https://www.apkmirror.com',
      'https://apkpure.com'
    ]

    for (const site of TEST_SITES) {
      console.log(`\n📱 Test Ediliyor: ${site}`)
      
      await page.goto(site, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })

      // Cloudflare kontrolünü geçmek için bekle
      await new Promise(resolve => setTimeout(resolve, 5000))

      const title = await page.title()
      const content = await page.content()
      const statusCode = await page.evaluate(() => {
        return new Promise((resolve) => {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', window.location.href)
          xhr.onload = () => resolve(xhr.status)
          xhr.send()
        })
      })

      console.log('Durum:', {
        cloudflareChallenge: content.includes('Checking your browser') ? '❌ Başarısız' : '✅ Başarılı',
        title,
        statusCode
      })

      // Ekran görüntüsü al
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      await page.screenshot({ path: `screenshots/${site.replace(/[^a-z]/gi, '_')}_${timestamp}.png` })
    }

  } catch (error) {
    console.error('Hata:', error)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

main() 