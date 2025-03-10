"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBoxProps {
  onSearch: (query: string) => void
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-[600px]">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="APK ara..."
            className="w-full pl-9"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          Ara
        </Button>
      </div>
    </div>
  )
} 