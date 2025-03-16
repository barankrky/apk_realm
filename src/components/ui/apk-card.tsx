"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"

interface ApkCardProps {
  name: string
  category: string
  version: string
  isMod?: boolean
  icon?: string
  slug?: string
}

export function ApkCard({ name, category, version, isMod = false, icon, slug }: ApkCardProps) {
  const urlSlug = slug || name.toLowerCase().replace(/ /g, '-')

  return (
    <Link href={`/apps/${urlSlug}`}>
      <Card className="group relative overflow-hidden border-border/40 hover:border-transparent bg-gradient-to-br from-background to-accent/5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.12)] hover:z-10">
        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-t from-primary/30 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
        
        <div className="p-2 flex items-center gap-2">
          {/* Icon */}
          <div className="h-8 w-8 shrink-0 rounded-lg overflow-hidden shadow-sm">
            {icon ? (
              <img 
                src={icon} 
                alt={name}
                className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-xs font-semibold">
                {name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-sm truncate leading-none group-hover:text-primary transition-colors duration-300">{name}</h3>
              {isMod && (
                <Badge variant="outline" className="h-3.5 px-1 text-[10px] font-medium border-primary/30 text-primary bg-primary/5">
                  MOD
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] leading-none text-muted-foreground">
              <span className="truncate">{category}</span>
              <span className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="font-medium text-primary/70">v{version}</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="relative shrink-0 h-6 w-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
            <Download className="absolute inset-0 h-3.5 w-3.5 m-auto text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        {/* Alt Çizgi Efekti */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  )
}