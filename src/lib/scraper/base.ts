import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Browser, Page } from 'puppeteer'
import { ScrapedApp, ScraperSource } from './types'
import axios from 'axios'

// FlareSolverr API endpoint
const FLARESOLVERR_URL = 'http://localhost:8191/v1'

// Stealth plugin'i gelişmiş ayarlarla ekle
const stealth = StealthPlugin()
stealth.enabledEvasions.delete('chrome.runtime')
stealth.enabledEvasions.delete('defaultArgs')
puppeteer.use(stealth)

export abstract class BaseScraper implements ScraperSource {
  name: string
  baseUrl: string
  enabled: boolean
  supports_mods: boolean
  protected browser: Browser | null = null
  protected page: Page | null = null

  constructor(name: string, baseUrl: string, enabled = true, supports_mods = false) {
    this.name = name
    this.baseUrl = baseUrl
    this.enabled = enabled
    this.supports_mods = supports_mods
  }

  async init() {
    try {
      if (!this.browser) {
        // Undetected Chrome ayarları
        this.browser = await puppeteer.launch({
          headless: false,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-site-isolation-trials',
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--window-size=1920,1080',
            '--start-maximized'
          ],
          ignoreDefaultArgs: ['--enable-automation']
        })
      }

      if (!this.page) {
        this.page = await this.browser.newPage()
        
        // Viewport ayarları
        await this.page.setViewport({
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          hasTouch: false,
          isLandscape: true,
          isMobile: false
        })

        // WebDriver özelliğini gizle
        await this.page.evaluateOnNewDocument(() => {
          Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
          Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
          Object.defineProperty(navigator, 'languages', { get: () => ['tr-TR', 'tr', 'en-US', 'en'] })
        })

        // User agent ayarla
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

        // HTTP başlıkları
        await this.page.setExtraHTTPHeaders({
          'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        })

        // JavaScript ve cookies aktif
        await this.page.setJavaScriptEnabled(true)
      }
    } catch (error) {
      console.error('Browser başlatma hatası:', error)
      throw error
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
      this.page = null
    }
  }

  protected async getPage(): Promise<Page> {
    await this.init()
    if (!this.page) {
      throw new Error('Page not initialized')
    }
    return this.page
  }

  // FlareSolverr ile URL'i çöz
  protected async solveCloudflare(url: string): Promise<string> {
    try {
      console.log('⌛ Cloudflare çözülüyor...')
      const response = await axios.post(FLARESOLVERR_URL, {
        cmd: 'request.get',
        url,
        maxTimeout: 60000
      })

      if (response.data.solution.status === 200) {
        console.log('✅ Cloudflare çözüldü')
        return response.data.solution.response
      }

      throw new Error('Cloudflare çözülemedi')
    } catch (error) {
      console.error('❌ Cloudflare çözme hatası:', error)
      throw error
    }
  }

  protected async navigateTo(url: string) {
    const page = await this.getPage()
    
    try {
      // Önce FlareSolverr ile çöz
      const html = await this.solveCloudflare(url)
      
      // Çözülmüş HTML'i sayfaya yükle
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 30000
      })
      
      // Sayfanın yüklendiğinden emin ol
      await page.waitForSelector('body')
    } catch (error) {
      console.error('❌ Sayfa yükleme hatası:', error)
      throw error
    }
  }

  protected async getText(selector: string): Promise<string> {
    const page = await this.getPage()
    await page.waitForSelector(selector, { timeout: 10000 })
    const element = await page.$(selector)
    if (!element) {
      return ''
    }
    return page.evaluate(el => el.textContent || '', element)
  }

  protected async getAttribute(selector: string, attribute: string): Promise<string> {
    const page = await this.getPage()
    await page.waitForSelector(selector, { timeout: 10000 })
    const element = await page.$(selector)
    if (!element) {
      return ''
    }
    return page.evaluate((el, attr) => el.getAttribute(attr) || '', element, attribute)
  }

  protected async exists(selector: string): Promise<boolean> {
    const page = await this.getPage()
    const element = await page.$(selector)
    return !!element
  }

  protected formatSize(size: string): string {
    const match = size.match(/(\d+\.?\d*)\s*(MB|KB|GB)/i)
    if (!match) return size
    return `${match[1]} ${match[2].toUpperCase()}`
  }

  protected formatVersion(version: string): string {
    return version.trim()
  }

  protected async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  abstract scrape(): Promise<ScrapedApp[]>
  
  // İndirme linki artık opsiyonel
  getDownloadLink?(packageName: string, version: string): Promise<string | null>
} 