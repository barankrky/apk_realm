export interface App {
  id: string
  name: string
  package_name: string
  category: string
  version: string
  size: string
  downloads: number
  rating: number
  is_mod: boolean
  mod_features?: string[]
  description: string
  icon_url: string
  screenshots: string[]
  android_version: string
  developer: string
  updated_at: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Comment {
  id: string
  app_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
}

export interface User {
  id: string
  email: string
  username: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
} 