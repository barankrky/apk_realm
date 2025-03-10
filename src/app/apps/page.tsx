import { getApps } from "@/lib/db"
import { AppList } from "@/components/apps/app-list"

export default async function AppsPage() {
  const apps = await getApps()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[1200px] px-4 py-8">
        <AppList initialApps={apps} />
      </div>
    </div>
  )
} 