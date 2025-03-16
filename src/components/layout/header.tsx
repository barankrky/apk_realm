"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex h-14 items-center justify-between rounded-full bg-card my-2 px-6 border-2 border-border/60 shadow-[0_4px_10px_0_rgba(0,0,0,0.08)]">
          <div className="flex md:flex-1 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 mr-2">
                  <Menu className="h-5 w-5 text-primary" />
                  <span className="sr-only">Menü</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] border-r-primary/20">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-center py-6 border-b">
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      APK Realm
                    </span>
                  </div>
                  <nav className="flex flex-col space-y-2 p-4">
                    <Link 
                      href="/" 
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
                    >
                      <span>Ana Sayfa</span>
                    </Link>
                    <Link 
                      href="/apps" 
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
                    >
                      <span>Uygulamalar</span>
                    </Link>
                    <Link 
                      href="/games" 
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
                    >
                      <span>Oyunlar</span>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex items-center space-x-6 ml-6">
              <Link href="/apps" className="text-sm font-medium hover:text-primary transition-colors">Uygulamalar</Link>
              <Link href="/games" className="text-sm font-medium hover:text-primary transition-colors">Oyunlar</Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">APK Realm</span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-end">
            <div className="w-full max-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="APK ara..."
                  className="w-full pl-9 rounded-full bg-muted/50 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 