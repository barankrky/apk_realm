import { searchApps } from '@/app/actions'
import { ApkCard } from '@/components/ui/apk-card'

interface SearchPageProps {
  searchParams: { q: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q
  const results = query ? await searchApps(query) : []

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="py-6">
          <h1 className="text-2xl font-bold mb-4">
            {query ? `"${query}" için arama sonuçları` : 'Arama'}
          </h1>

          {results.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((app) => (
                <ApkCard
                  key={app.id}
                  name={app.name}
                  version={app.version}
                  icon={app.icon_url}
                  slug={app.package_name}
                  category={app.category}
                  isMod={app.is_mod}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {query ? 'Sonuç bulunamadı.' : 'Arama yapmak için yukarıdaki arama çubuğunu kullanın.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 