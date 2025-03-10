"use client"

import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Star, Image as ImageIcon, MessageCircle } from "lucide-react"

// Örnek veri - daha sonra Supabase'den gelecek
const appsData = {
  "spotify-premium": {
    name: "Spotify Premium",
    category: "Müzik",
    version: "8.8.2.3",
    size: "30 MB",
    downloads: "850K",
    rating: "4.8",
    isMod: true,
    modFeatures: [
      "Premium özelliklerin kilidi açıldı",
      "Reklamsız dinleme",
      "Sınırsız atlama",
      "Çevrimdışı dinleme",
    ],
    description: "Spotify, milyonlarca şarkı, podcast ve videoya anında erişim sağlayan dijital müzik, podcast ve video akış hizmetidir.",
    icon: "https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w240-h480-rw",
    screenshots: [
      "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/GnYnNfKBr2nysHBYgYuN8ugxQHj6MWKVxnEJR5_8gnC3DUvnTlG_kIqoKMID9QHkLHpf=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/8KpwawHGe1XxGlbAWNqm8YPfxmZgZkn5ZCwkjEOoNc3T_nLqoHYoii-VLBvJqNhOBjg=w2560-h1440-rw",
    ],
    requirements: {
      android: "5.0 ve üzeri",
      package: "com.spotify.music",
      developer: "Spotify AB",
      updated: "10 Mart 2024",
    }
  },
  "whatsapp": {
    name: "WhatsApp",
    category: "Sosyal Medya",
    version: "2.24.3.12",
    size: "48 MB",
    downloads: "1.2M",
    rating: "4.5",
    isMod: false,
    description: "WhatsApp Messenger: 2 milyardan fazla kişinin kullandığı, ücretsiz ve güvenli mesajlaşma ve arama uygulaması.",
    icon: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw",
    screenshots: [
      "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw"
    ],
    requirements: {
      android: "4.1 ve üzeri",
      package: "com.whatsapp",
      developer: "WhatsApp LLC",
      updated: "12 Mart 2024",
    }
  },
  "pubg-mobile": {
    name: "PUBG Mobile",
    category: "Oyunlar",
    version: "2.9.0",
    size: "721 MB",
    downloads: "2.1M",
    rating: "4.3",
    isMod: false,
    description: "PUBG Mobile, orijinal battle royale deneyimini mobil cihazlara getiren resmi oyundur.",
    icon: "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=w240-h480-rw",
    screenshots: [
      "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w2560-h1440-rw"
    ],
    requirements: {
      android: "6.0 ve üzeri",
      package: "com.tencent.ig",
      developer: "Tencent Games",
      updated: "8 Mart 2024",
    }
  }
}

export default function AppDetailPage() {
  const { slug } = useParams()
  const appDetail = appsData[slug as keyof typeof appsData]

  if (!appDetail) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <h1 className="text-2xl font-bold">Uygulama bulunamadı</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* App Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img 
                src={appDetail.icon} 
                alt={appDetail.name}
                className="h-24 w-24 rounded-xl shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">{appDetail.name}</h1>
                {appDetail.isMod && (
                  <Badge variant="outline" className="font-normal">MOD</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{appDetail.category}</span>
                <span>•</span>
                <span>{appDetail.version}</span>
                <span>•</span>
                <span>{appDetail.downloads} indirme</span>
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
            {appDetail.isMod && appDetail.modFeatures && (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">MOD Özellikleri</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {appDetail.modFeatures.map((feature) => (
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
                    <span>{appDetail.requirements.android}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket Adı</span>
                    <span>{appDetail.requirements.package}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Geliştirici</span>
                    <span>{appDetail.requirements.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Son Güncelleme</span>
                    <span>{appDetail.requirements.updated}</span>
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