import { supabase } from './supabase'
import { App, Category } from '@/types'

export async function getApps() {
  const { data, error } = await supabase
    .from('apps')
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Uygulamalar yüklenirken hata:', error)
    return []
  }

  return data.map(app => ({
    ...app,
    category: app.categories.name,
    categorySlug: app.categories.slug
  }))
}

export async function getAppBySlug(slug: string) {
  const packageName = slug.replace(/-/g, '.')
  
  const { data, error } = await supabase
    .from('apps')
    .select(`
      *,
      categories:category_id (
        name,
        slug
      )
    `)
    .eq('package_name', packageName)
    .single()

  if (error) {
    console.error('Uygulama yüklenirken hata:', error)
    return null
  }

  return {
    ...data,
    category: data.categories.name,
    categorySlug: data.categories.slug
  }
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Kategoriler yüklenirken hata:', error)
    return []
  }

  return data
} 