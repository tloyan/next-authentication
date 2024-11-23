/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from 'next/server'
//🐶 Importe `Cookies`
import { cookies } from 'next/headers'
import { decrypt } from './app/exercises/auth/lib/crypt'

//🐶 1. Définies les routes privées et publiques dans un `Set`

const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])

const publicRoutes = new Set(['/'])

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.has(path)
  const isPublicRoute = publicRoutes.has(path)

  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)

  const hasSession = (session?.userId || session?.sessionId) !== undefined

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/exercises/login', request.url))
  }

  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL('/exercises/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
