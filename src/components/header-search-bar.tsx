'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export function HeaderSearchBar() {
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
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="APK ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-9 rounded-full bg-muted/50 focus-visible:ring-primary"
      />
    </div>
  )
} 