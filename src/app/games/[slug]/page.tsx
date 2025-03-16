import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Star, Trophy, Gamepad2 } from "lucide-react"
import { getAppBySlug } from "@/lib/db"
import { notFound } from "next/navigation"
import { AppDetailTabs } from "@/components/apps/app-detail-tabs"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params
  const gameDetail = await getAppBySlug(slug)

  if (!gameDetail || gameDetail.category !== "Oyunlar") {
    notFound()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* Game Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img 
                src={gameDetail.icon_url} 
                alt={gameDetail.name}
                className="h-24 w-24 rounded-xl shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">{gameDetail.name}</h1>
                <Badge variant="outline" className="font-normal bg-primary/5 text-primary">
                  <Gamepad2 className="w-3 h-3 mr-1" />
                  Oyun
                </Badge>
                {gameDetail.is_mod && (
                  <Badge variant="outline" className="font-normal">MOD</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{gameDetail.category}</span>
                <span>•</span>
                <span>{gameDetail.version}</span>
                <span>•</span>
                <span>{gameDetail.downloads.toLocaleString()} indirme</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{gameDetail.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-medium">Editör Seçimi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <Card className="mb-8 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">İndirme Seçenekleri</h2>
              <p className="text-sm text-muted-foreground">Güvenilir kaynaklardan APK dosyasını indirin</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                APKCombo
              </Button>
              <Button className="flex-1 sm:flex-none">
                <Download className="mr-2 h-4 w-4" />
                APKMirror
              </Button>
            </div>
          </div>
        </Card>

        <AppDetailTabs app={gameDetail} />
      </div>
    </div>
  )
} 