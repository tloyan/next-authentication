import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'
import {decrypt} from './app/exercises/auth/lib/crypt'

// 1. Specify protected and public routes
const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])
const publicRoutes = new Set(['/'])

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path)
  const isPublicRoute = publicRoutes.has(path)

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  const hasSession = session?.userId || session?.sessionId

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/exercises/login', request.nextUrl))
  }

  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL('/exercises/auth', request.nextUrl))
  }
  NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
