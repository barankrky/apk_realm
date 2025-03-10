import { Badge } from "@/components/ui/badge"
import { ApkCard } from "@/components/ui/apk-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const categories = [
  { name: "Oyunlar", href: "/category/games" },
  { name: "Sosyal Medya", href: "/category/social" },
  { name: "Araçlar", href: "/category/tools" },
  { name: "Eğitim", href: "/category/education" },
  { name: "Müzik", href: "/category/music" },
  { name: "Video", href: "/category/video" },
]

const featuredApps = [
  {
    name: "WhatsApp",
    category: "Sosyal Medya",
    version: "2.24.3.12",
    size: "48 MB",
    downloads: "1.2M",
    icon: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw"
  },
  {
    name: "Spotify Premium",
    category: "Müzik",
    version: "8.8.2.3",
    size: "30 MB",
    downloads: "850K",
    isMod: true,
    icon: "https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w240-h480-rw"
  },
  {
    name: "PUBG Mobile",
    category: "Oyunlar",
    version: "2.9.0",
    size: "721 MB",
    downloads: "2.1M",
    icon: "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=w240-h480-rw"
  },
]

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              APK Realm'e Hoş Geldiniz
            </h1>
            <p className="text-muted-foreground">
              Android uygulamalarını güvenilir kaynaklardan indirin
            </p>
            <div className="relative w-full max-w-[600px] mt-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="APK ara..."
                    className="w-full pl-9"
                  />
                </div>
                <Button className="bg-black text-white hover:bg-black/90">
                  Ara
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Kategoriler</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="ghost"
                className="rounded-full py-1.5 px-4 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Apps Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Öne Çıkan APK'lar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <ApkCard key={app.name} {...app} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
