import { Badge } from "@/components/ui/badge"
import { ApkCard } from "@/components/ui/apk-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getApps, getCategories } from "@/lib/db"

export default async function Home() {
  const [apps, categories] = await Promise.all([
    getApps(),
    getCategories()
  ])

  // Son eklenen 6 uygulamayı göster
  const featuredApps = apps.slice(0, 6)

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
                key={category.id}
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
          <h2 className="text-2xl font-semibold mb-4">Son Eklenen APK'lar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <ApkCard
                key={app.id}
                name={app.name}
                category={app.category}
                version={app.version}
                size={app.size}
                downloads={app.downloads.toLocaleString()}
                isMod={app.is_mod}
                icon={app.icon_url}
                slug={app.package_name.replace(/\./g, '-')}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
