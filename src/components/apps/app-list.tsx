"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ApkCard } from "@/components/ui/apk-card"
import { Filters } from "@/components/apps/filters"
import { Pagination } from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { App } from "@/types"
import { SearchBox } from "@/components/apps/search-box"

interface AppListProps {
  initialApps: App[]
}

const ITEMS_PER_PAGE = 6

export function AppList({ initialApps }: AppListProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredApps = initialApps.filter(app => {
    if (selectedCategory !== "all" && app.categorySlug !== selectedCategory) {
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
    <>
      <div className="mb-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Android Uygulamaları
          </h1>
          <SearchBox onSearch={setSearchQuery} />
        </div>
      </div>

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
    </>
  )
} 