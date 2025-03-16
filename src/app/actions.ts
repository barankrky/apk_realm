'use server'

import { getApps } from "@/lib/db"
import { supabase } from '@/lib/supabase'

export async function searchApps(query: string) {
  const { data, error } = await supabase
    .from('apps')
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .ilike('name', `%${query}%`)
    .order('downloads', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Arama yaparken hata:', error)
    return []
  }

  return data.map(app => ({
    ...app,
    category: app.categories.name,
    categorySlug: app.categories.slug
  }))
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