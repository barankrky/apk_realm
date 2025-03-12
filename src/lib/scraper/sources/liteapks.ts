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

  // Belirli bir uygulamanın detaylarını getir
  async getAppDetails(packageName: string): Promise<ScrapedApp | null> {
    if (!this.browser) {
      console.error('Browser başlatılamadı');
      return null;
    }

    const page = await this.browser.newPage();
    
    try {
      const appUrl = `${this.baseUrl}/${packageName}.html`
      console.log(`📱 ${packageName} detayları alınıyor...`)
      console.log(`🔗 URL: ${appUrl}`)
      
      await page.goto(appUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // Cloudflare challenge'ı bekle
      try {
        const challengeElement = await page.$('#challenge-running');
        if (challengeElement) {
          console.log('⚠️ Cloudflare doğrulaması bekleniyor...');
          await page.waitForFunction(() => !document.querySelector('#challenge-running'), { timeout: 60000 });
          console.log('✅ Cloudflare doğrulaması tamamlandı');
        }
      } catch (error) {
        console.error('⚠️ Cloudflare hatası:', error);
      }

      console.log('⌛ Sayfa yükleniyor...')
      await page.waitForSelector('article.bg-white', { timeout: 60000 })
      console.log('✅ Sayfa yüklendi')

      // Play Store linkinden paket ismini al
      const playStoreLink = await page.$eval('.table a[href*="play.google.com"]', el => el.getAttribute('href')) || ''
      const appPackageName = playStoreLink.match(/id=(.*?)(&|$)/)?.at(1) || ''
      console.log(`📦 Paket İsmi: ${appPackageName}`)

      console.log('📝 Uygulama bilgileri alınıyor...')
      const nameText = await page.$eval('h1.h2.font-weight-bold', el => el.textContent?.trim()) || ''
      const name = nameText.replace(/\s+/g, ' ').trim()
      console.log(`📱 İsim: ${name}`)
      
      const iconUrl = await page.$eval('.rounded-lg.d-block.object-cover', el => el.getAttribute('src')) || ''
      const version = await page.$eval('.table tr:nth-child(5) td', el => el.textContent?.trim()) || ''
      console.log(`📦 Versiyon: ${version}`)
      
      const developer = await page.$eval('.table tr:nth-child(2) td a', el => el.textContent?.trim()) || ''
      console.log(`👨‍💻 Geliştirici: ${developer}`)
      
      const category = await page.$eval('.table tr:nth-child(3) td a', el => el.textContent?.trim()) || ''
      const description = await page.$eval('.small.bg-light.rounded.pt-3.px-3.mb-3 p', el => el.textContent?.trim()) || ''
      const size = await page.$eval('.table tr:nth-child(4) td', el => el.textContent?.trim()) || ''
      console.log(`📏 Boyut: ${size}`)
      
      const downloads = parseInt((await page.$eval('.rating + span', el => el.textContent?.trim()))?.replace(/[^0-9]/g, '') || '0')
      console.log(`⬇️ İndirme: ${downloads}`)
      
      const rating = parseFloat((await page.$eval('.rating + span', el => el.textContent?.trim()))?.split('/')[0] || '0')
      console.log(`⭐ Puan: ${rating}`)

      // Son güncelleme tarihini al
      const latestUpdateText = await page.$eval('time.d-block em.align-middle', el => el.textContent?.trim()) || ''
      const latestUpdate = latestUpdateText.replace(/\s+/g, ' ').trim()
      console.log(`📅 Son Güncelleme: ${latestUpdate}`)

      // Mod özellikleri
      console.log('🔧 Mod özellikleri alınıyor...')
      const modFeatures = await page.$$eval('#more-info-1 .pt-3.px-3 ul li, #more-info-1 .pt-3.px-3 p', 
        elements => elements.map(el => el.textContent?.trim() || '')
      ) || []
      console.log(`✅ ${modFeatures.length} mod özelliği bulundu`)

      // Screenshot URLs - TODO: Ekran görüntüleri için yeni selektör eklenecek
      const screenshots: string[] = []

      // İndirme linklerini ve varyantları al
      console.log('🔗 İndirme linkleri alınıyor...')
      const downloadPageLink = await page.$eval('.btn.btn-primary.btn-block', el => el.getAttribute('href')) || ''
      
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
          variants
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

  // İndirme linklerini ve APK varyantlarını getir
  private async getDownloadVariants(downloadPageLink: string): Promise<{ downloadLinks: string[], variants: APKVariant[] }> {
    if (!this.browser) {
      console.error('Browser başlatılamadı');
      return { downloadLinks: [], variants: [] };
    }

    const page = await this.browser.newPage();
    
    try {
      // İndirme sayfasına git
      console.log('⌛ İndirme sayfası yükleniyor...')
      await page.goto(downloadPageLink, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      // Cloudflare challenge'ı bekle
      try {
        const challengeElement = await page.$('#challenge-running');
        if (challengeElement) {
          console.log('⚠️ Cloudflare doğrulaması bekleniyor...');
          await page.waitForFunction(() => !document.querySelector('#challenge-running'), { timeout: 60000 });
          console.log('✅ Cloudflare doğrulaması tamamlandı');
        }
      } catch (error) {
        console.error('⚠️ Cloudflare hatası:', error);
      }

      const downloadLinks: string[] = []
      const variants: APKVariant[] = []

      // Her bir varyant grubu için
      const variantGroups = await page.$$('.border.rounded.mb-2')
      
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
    } finally {
      await page.close()
    }
  }
} 