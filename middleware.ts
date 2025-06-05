import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Create a response object
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the current path
  const path = req.nextUrl.pathname

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/auth/callback', '/']
  const isPublicRoute = publicRoutes.some(route => path === route || path.startsWith(route))

  // If on a public route and authenticated, redirect to dashboard
  if (isPublicRoute && session) {
    // Only redirect if we're not already on the dashboard
    if (!path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // If on a protected route and not authenticated, redirect to login
  if (path.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // For protected routes, check user role
  if (path.startsWith('/dashboard') && session) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!profile) {
        return NextResponse.redirect(new URL('/login', req.url))
      }

      // Add role to request headers for use in components
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set('x-user-role', profile.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 