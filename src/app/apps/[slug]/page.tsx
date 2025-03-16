import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Star } from "lucide-react"
import { getAppBySlug } from "@/lib/db"
import { notFound } from "next/navigation"
import { AppDetailTabs } from "@/components/apps/app-detail-tabs"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function AppDetailPage({ params }: Props) {
  const { slug } = await params
  const appDetail = await getAppBySlug(slug)

  if (!appDetail) {
    notFound()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* App Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img 
                src={appDetail.icon_url} 
                alt={appDetail.name}
                className="h-24 w-24 rounded-xl shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">{appDetail.name}</h1>
                {appDetail.is_mod && (
                  <Badge variant="outline" className="font-normal">MOD</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{appDetail.category}</span>
                <span>•</span>
                <span>{appDetail.version}</span>
                <span>•</span>
                <span>{appDetail.downloads.toLocaleString()} indirme</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{appDetail.rating}</span>
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

        <AppDetailTabs app={appDetail} />
      </div>
    </div>
  )
} 