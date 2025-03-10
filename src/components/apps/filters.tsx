"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  { name: "Tümü", value: "all" },
  { name: "Oyunlar", value: "games" },
  { name: "Sosyal Medya", value: "social" },
  { name: "Araçlar", value: "tools" },
  { name: "Eğitim", value: "education" },
  { name: "Müzik", value: "music" },
  { name: "Video", value: "video" },
]

interface FiltersProps {
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  onSearch?: (query: string) => void
}

export function Filters({ selectedCategory = "all", onCategoryChange, onSearch }: FiltersProps) {
  return (
    <div className="flex flex-col divide-y space-y-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-foreground/90">Kategoriler</h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((category) => (
            <Badge
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "ghost"}
              className="justify-start cursor-pointer py-1.5 px-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={() => onCategoryChange?.(category.value)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <h3 className="text-base font-semibold text-foreground/90">Filtrele</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            Normal
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            Modlu
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <h3 className="text-base font-semibold text-foreground/90">Sırala</h3>
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            En Yeni
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            En Çok İndirilen
          </Button>
        </div>
      </div>
    </div>
  )
} 