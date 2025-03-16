'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export function HeroSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`)
    }
  }, [debouncedQuery, router])

  return (
    <div className="w-full max-w-2xl relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input 
        type="search"
        placeholder="Uygulama veya oyun ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 py-6 text-lg rounded-full border-2 hover:border-primary/60 transition-colors"
      />
    </div>
  )
} 