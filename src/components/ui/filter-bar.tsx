'use client'

import { Button } from "./button"
import { Input } from "./input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterBarProps {
  onSearch: (value: string) => void
  onSort: (value: string) => void
  onFilter: (value: string) => void
}

export function FilterBar({ onSearch, onSort, onFilter }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="APK ara..."
          className="w-full pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <Select onValueChange={onSort}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sıralama" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">En Yeni</SelectItem>
          <SelectItem value="popular">En Popüler</SelectItem>
          <SelectItem value="downloads">İndirme Sayısı</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onFilter}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filtrele" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tümü</SelectItem>
          <SelectItem value="mod">Mod APK</SelectItem>
          <SelectItem value="original">Orijinal APK</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 