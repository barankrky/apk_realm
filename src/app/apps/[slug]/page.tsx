"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Star, Image as ImageIcon, MessageCircle } from "lucide-react"
import { getAppBySlug } from "@/lib/db"
import { notFound } from "next/navigation"

interface Props {
  params: {
    slug: string
  }
}

export default async function AppDetailPage({ params }: Props) {
  const appDetail = await getAppBySlug(params.slug)

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

        {/* Content Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList>
            <TabsTrigger value="about">Hakkında</TabsTrigger>
            <TabsTrigger value="screenshots">
              <ImageIcon className="mr-2 h-4 w-4" />
              Ekran Görüntüleri
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageCircle className="mr-2 h-4 w-4" />
              Yorumlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            {/* Mod Features */}
            {appDetail.is_mod && appDetail.mod_features && (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">MOD Özellikleri</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {appDetail.mod_features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Description */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Açıklama</h3>
              <p className="text-muted-foreground">{appDetail.description}</p>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Teknik Bilgiler</h3>
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Android Sürümü</span>
                    <span>{appDetail.android_version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket Adı</span>
                    <span>{appDetail.package_name}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Geliştirici</span>
                    <span>{appDetail.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Son Güncelleme</span>
                    <span>{new Date(appDetail.updated_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="screenshots">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {appDetail.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${appDetail.name} ekran görüntüsü ${index + 1}`}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                Henüz yorum yapılmamış. İlk yorumu siz yapın!
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 