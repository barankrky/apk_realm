'use server'

import { getApps } from "@/lib/db"

export async function searchApps(query: string) {
  const apps = await getApps()
  return apps.filter(app => 
    app.name.toLowerCase().includes(query.toLowerCase())
  )
}

export async function sortApps(sortBy: string) {
  const apps = await getApps()
  switch (sortBy) {
    case 'newest':
      return apps.sort((a, b) => b.created_at - a.created_at)
    case 'popular':
      return apps.sort((a, b) => b.downloads - a.downloads)
    case 'downloads':
      return apps.sort((a, b) => b.downloads - a.downloads)
    default:
      return apps
  }
}

export async function filterApps(filter: string) {
  const apps = await getApps()
  switch (filter) {
    case 'mod':
      return apps.filter(app => app.is_mod)
    case 'original':
      return apps.filter(app => !app.is_mod)
    default:
      return apps
  }
} 