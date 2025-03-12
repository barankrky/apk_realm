import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Browser, Page } from 'puppeteer'
import { ScrapedApp, ScraperSource } from './types'

// Stealth plugin'i ekle
puppeteer.use(StealthPlugin())

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

  protected async init() {
    try {
      if (!this.browser) {
        this.browser = await puppeteer.launch({
          headless: false, // Headless modunu etkinleştir
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080'
          ]
        })
      }

      if (!this.page) {
        this.page = await this.browser.newPage()
        
        // Viewport ayarları
        await this.page.setViewport({
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1
        })

        // User agent ayarla
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

        // HTTP başlıkları
        await this.page.setExtraHTTPHeaders({
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
      }
    } catch (error) {
      console.error('Browser başlatma hatası:', error)
      throw error
    }
  }

  protected async close() {
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

  protected async navigateTo(url: string) {
    const page = await this.getPage()
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    })
    
    // Cloudflare korumasını aşmak için bekleme
    await this.delay(5000)
    
    // Sayfanın yüklendiğinden emin ol
    await page.waitForSelector('body')
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