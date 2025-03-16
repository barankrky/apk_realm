'use client'

import { ApkCard } from "@/components/ui/apk-card"
import { CompactApkCard } from "@/components/ui/compact-apk-card"
import { getApps } from "@/lib/db"
import { useState, useEffect } from "react"
import { App } from "@/types"
import { SearchBar } from "@/components/search-bar"
import { HeroSearchBar } from '@/components/hero-search-bar'

export default function Home() {
  const [latestApps, setLatestApps] = useState<App[]>([])
  const [popularApps, setPopularApps] = useState<App[]>([])
  const [editorsPicks, setEditorsPicks] = useState<App[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const apps = await getApps()
      
      // En son yüklenenler (son 8 uygulama)
      setLatestApps(apps.slice(0, 8))
      
      // Popüler uygulamalar (şimdilik rastgele 4 uygulama)
      setPopularApps(apps.slice(8, 12))
      
      // Editörün seçimi (şimdilik rastgele 4 uygulama)
      setEditorsPicks(apps.slice(12, 16))
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              APK Realm'e Hoş Geldiniz
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Android uygulamalarını güvenilir kaynaklardan indirin
            </p>
            <HeroSearchBar />
          </div>
        </section>

        {/* Editörün Seçimi */}
        <section className="pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Editörün Seçimi</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {editorsPicks.map((app) => (
              <CompactApkCard
                key={app.id}
                name={app.name}
                version={app.version}
                icon={app.icon_url}
                slug={app.package_name}
                category={app.category}
              />
            ))}
          </div>
        </section>

        {/* En Son Yüklenenler */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">En Son Yüklenenler</h2>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {latestApps.map((app) => (
              <CompactApkCard
                key={app.id}
                name={app.name}
                version={app.version}
                icon={app.icon_url}
                slug={app.package_name}
                category={app.category}
              />
            ))}
          </div>
        </section>

        {/* Popüler Uygulamalar */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Popüler Uygulamalar</h2>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {popularApps.map((app) => (
              <ApkCard
                key={app.id}
                name={app.name}
                category={app.category}
                version={app.version}
                isMod={app.is_mod}
                icon={app.icon_url}
                slug={app.package_name}
              />
            ))}
          </div>
        </section>

        
      </div>
    </div>
  )
}
