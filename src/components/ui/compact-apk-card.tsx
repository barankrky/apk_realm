import Image from "next/image"
import Link from "next/link"
import { Card } from "./card"

interface CompactApkCardProps {
  name: string
  version: string
  icon: string
  slug: string
  category: string
}

export function CompactApkCard({ name, version, icon, slug, category }: CompactApkCardProps) {
  // Oyun kategorisi kontrolü
  const baseRoute = category === "Oyunlar" ? "games" : "apps"

  return (
    <Link href={`/${baseRoute}/${slug}`}>
      <Card className="group relative overflow-hidden border-border/40 hover:border-transparent bg-gradient-to-br from-background to-accent/5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12)] hover:z-10">
        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-t from-primary/30 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
        
        <div className="p-2 flex flex-col items-center space-y-1.5">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={icon}
              alt={name}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-xs truncate max-w-[100px] group-hover:text-primary transition-colors duration-300">{name}</h3>
            <p className="text-[10px] text-primary/70 font-medium">v{version}</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  )
}