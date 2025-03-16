import puppeteer from 'puppeteer'

async function analyzePage() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  })

  const page = await browser.newPage()
  
  try {
    // Tarayıcı parmak izini gizle
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
    })

    // Ana sayfayı yükle
    console.log('Ana sayfa yükleniyor...')
    await page.goto('https://www.apkmirror.com/uploads', {
      waitUntil: 'networkidle0',
      timeout: 60000
    })

    // Sayfanın HTML içeriğini al
    const content = await page.content()
    console.log('\nSayfa İçeriği Örneği:')
    console.log(content.substring(0, 500))

    // Uygulama kartlarını analiz et
    const appStructure = await page.evaluate(() => {
      const appCards = document.querySelectorAll('.listWidget')
      const sampleCard = appCards[0]

      return {
        totalApps: appCards.length,
        sampleCard: sampleCard ? {
          title: sampleCard.querySelector('.appRowTitle')?.textContent?.trim(),
          developer: sampleCard.querySelector('.byDeveloper')?.textContent?.trim(),
          version: sampleCard.querySelector('.appRowVersions')?.textContent?.trim(),
          uploadDate: sampleCard.querySelector('.appRowRelease')?.textContent?.trim(),
          detailUrl: sampleCard.querySelector('.appRowTitle a')?.href
        } : null,
        selectors: {
          container: '.listWidget',
          title: '.appRowTitle',
          developer: '.byDeveloper',
          version: '.appRowVersions',
          uploadDate: '.appRowRelease',
          detailLink: '.appRowTitle a'
        }
      }
    })

    console.log('\nUygulama Kartı Yapısı:', JSON.stringify(appStructure, null, 2))

    // Detay sayfasını analiz et
    if (appStructure.sampleCard?.detailUrl) {
      console.log('\nDetay sayfası analizi yapılıyor...')
      await page.goto(appStructure.sampleCard.detailUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      })

      const detailStructure = await page.evaluate(() => {
        return {
          selectors: {
            appInfo: '.appspec-row',
            packageName: '.package-name',
            version: '.version',
            size: '.size',
            developer: '.developer',
            description: '.notes',
            icon: '.app-icon img',
            screenshots: '.screenshots img',
            rating: '.rating',
            downloads: '.downloads'
          },
          sampleData: {
            packageName: document.querySelector('.package-name')?.textContent?.trim(),
            version: document.querySelector('.version')?.textContent?.trim(),
            size: document.querySelector('.size')?.textContent?.trim(),
            developer: document.querySelector('.developer')?.textContent?.trim(),
            description: document.querySelector('.notes')?.textContent?.trim(),
            icon: document.querySelector('.app-icon img')?.src,
            screenshots: Array.from(document.querySelectorAll('.screenshots img')).map(img => (img as HTMLImageElement).src),
            rating: document.querySelector('.rating')?.textContent?.trim(),
            downloads: document.querySelector('.downloads')?.textContent?.trim()
          }
        }
      })

      console.log('Detay Sayfası Yapısı:', JSON.stringify(detailStructure, null, 2))
    }
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    await browser.close()
  }
}

analyzePage() 