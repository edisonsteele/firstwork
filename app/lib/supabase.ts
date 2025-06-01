import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  email: string
  role: 'parent' | 'teacher' | 'admin'
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  full_name: string
  organization?: string
  created_at: string
} 