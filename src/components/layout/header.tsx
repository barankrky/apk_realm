"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-[1200px] px-4 h-14 flex items-center">
        <div className="flex flex-1 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-sm font-medium">Ana Sayfa</Link>
                <Link href="/apps" className="text-sm font-medium">Uygulamalar</Link>
                <Link href="/mods" className="text-sm font-medium">Modlar</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center space-x-6 ml-6">
            <Link href="/apps" className="text-sm font-medium">Uygulamalar</Link>
            <Link href="/mods" className="text-sm font-medium">Modlar</Link>
          </nav>
        </div>

        <Link href="/" className="flex items-center space-x-2 mx-4">
          <span className="font-bold text-lg">APK Realm</span>
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <div className="w-full max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="APK ara..."
                className="w-full pl-9"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 