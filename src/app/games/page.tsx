import { getAppsByCategory } from "@/lib/db"
import { AppList } from "@/components/apps/app-list"

export default async function GamesPage() {
  // Oyun kategorisindeki uygulamaları getir
  const games = await getAppsByCategory("Oyunlar")

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Oyunlar</h1>
            <p className="text-muted-foreground">En popüler Android oyunlarını keşfedin</p>
          </div>
        </div>
        <AppList initialApps={games} />
      </div>
    </div>
  )
} 