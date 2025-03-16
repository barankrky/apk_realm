export interface App {
  id: string
  name: string
  category: string
  version: string
  size: string
  downloads: number
  is_mod: boolean
  icon_url: string
  package_name: string
  created_at: number
}

export interface Category {
  id: string
  name: string
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