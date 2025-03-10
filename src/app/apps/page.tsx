"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ApkCard } from "@/components/ui/apk-card"
import { Filters } from "@/components/apps/filters"
import { Pagination } from "@/components/ui/pagination"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getApps } from "@/lib/db"
import { App } from "@/types"

const ITEMS_PER_PAGE = 6

export default async function AppsPage() {
  const apps = await getApps()

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
            <Filters />
          </aside>

          {/* Main Content */}
          <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {apps.length} sonuç bulundu
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {apps.map((app) => (
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

            {apps.length > ITEMS_PER_PAGE && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={1}
                  totalPages={Math.ceil(apps.length / ITEMS_PER_PAGE)}
                  onPageChange={() => {}}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 