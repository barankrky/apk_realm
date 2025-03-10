"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ApkCard } from "@/components/ui/apk-card"
import { Filters } from "@/components/apps/filters"
import { Pagination } from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Örnek veri - daha sonra Supabase'den gelecek
const apps = [
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
  {
    name: "Instagram",
    category: "Sosyal Medya",
    version: "314.0.0.0",
    size: "55 MB",
    downloads: "5M",
    icon: "https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw"
  },
  {
    name: "YouTube Premium",
    category: "Video",
    version: "19.05",
    size: "85 MB",
    downloads: "3.2M",
    isMod: true,
    icon: "https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc=w240-h480-rw"
  },
  {
    name: "Telegram",
    category: "Sosyal Medya",
    version: "10.8.1",
    size: "68 MB",
    downloads: "1.8M",
    icon: "https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=w240-h480-rw"
  },
]

const ITEMS_PER_PAGE = 6

export default function AppsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredApps = apps.filter(app => {
    if (selectedCategory !== "all" && app.category.toLowerCase() !== selectedCategory) {
      return false
    }
    if (searchQuery && !app.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedApps = filteredApps.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Android Uygulamaları
            </h1>
            <div className="relative w-full max-w-[600px]">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="APK ara..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>
                <Button className="bg-black text-white hover:bg-black/90">
                  Ara
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-lg border p-4">
            <Filters
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
            />
          </aside>

          {/* Main Content */}
          <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredApps.length} sonuç bulundu
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {paginatedApps.map((app) => (
                <ApkCard key={app.name} {...app} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 