import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabase } from "@/lib/supabase"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Create or update user in your users table
        const { error } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            role: 'admin',
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          })

        if (error) {
          console.error('Error creating user:', error)
          return false
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
}) 