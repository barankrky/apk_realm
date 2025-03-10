"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image as ImageIcon, MessageCircle } from "lucide-react"
import { App } from "@/types"

interface AppDetailTabsProps {
  app: App
}

export function AppDetailTabs({ app }: AppDetailTabsProps) {
  return (
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
        {app.is_mod && app.mod_features && (
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">MOD Özellikleri</h3>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              {app.mod_features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Card>
        )}

        {/* Description */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Açıklama</h3>
          <p className="text-muted-foreground">{app.description}</p>
        </Card>

        {/* Requirements */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Teknik Bilgiler</h3>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Android Sürümü</span>
                <span>{app.android_version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paket Adı</span>
                <span>{app.package_name}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Geliştirici</span>
                <span>{app.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Son Güncelleme</span>
                <span>{new Date(app.updated_at).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="screenshots">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {app.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`${app.name} ekran görüntüsü ${index + 1}`}
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
  )
} 