export interface APKVariant {
  name: string
  version: string
  size: string
  type: string
  download_link: string
  notes?: string
}

export interface ScrapedApp {
  name: string
  package_name: string
  version: string
  size: string
  developer: string
  description: string
  icon_url: string
  screenshots: string[]
  download_links: string[]
  is_mod: boolean
  mod_features: string[]
  category: string
  rating: number
  downloads: number
  latest_update: string // Son güncelleme tarihi
  variants: APKVariant[] // APK varyantları
}

export interface ScraperSource {
  name: string
  baseUrl: string
  enabled: boolean
  supports_mods: boolean
  scrape(): Promise<ScrapedApp[]>
  getDownloadLink?(packageName: string, version: string): Promise<string | null>
}

export interface ScraperConfig {
  sources: {
    apkcombo: boolean
    apkmirror: boolean
    liteapks: boolean
  }
  update_interval: number // in hours
  categories: string[]
  max_apps_per_source: number
} 