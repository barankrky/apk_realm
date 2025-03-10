"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ApkCardProps {
  name: string
  category: string
  version: string
  size: string
  downloads: string
  isMod?: boolean
  icon?: string
  slug?: string
}

export function ApkCard({ name, category, version, size, downloads, isMod = false, icon, slug }: ApkCardProps) {
  // URL-friendly slug oluştur
  const urlSlug = slug || name.toLowerCase().replace(/ /g, '-')

  return (
    <Card className="overflow-hidden border rounded-lg hover:shadow-sm transition-shadow">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 font-semibold">
            {icon ? (
              <img src={icon} alt={name} className="h-12 w-12 rounded-lg" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{name}</span>
              {isMod && (
                <Badge variant="outline" className="font-normal">
                  MOD
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-t p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Versiyon:</span>
          <span>{version}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Boyut:</span>
          <span>{size}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">İndirme:</span>
          <span>{downloads}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full bg-black text-white hover:bg-black/90">
          <Link href={`/apps/${urlSlug}`}>İndir</Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 