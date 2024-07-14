import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'
import {decrypt} from './app/exercises/auth/lib/crypt'
import {RoleEnum} from './lib/type'

// 1. Specify protected and public routes
const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])
const publicRoutes = new Set(['/'])

const adminRoutes = new Set(['/admin'])

const redactorRoutes = new Set(['/redaction'])

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path)
  const isPublicRoute = publicRoutes.has(path)
  const isAdminRoute = adminRoutes.has(path)
  const isRedactorRoute = redactorRoutes.has(path)

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  const role = session?.role
  console.log('middleware role', role)

  const hasSession = session?.userId || session?.sessionId

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/exercises/login', request.nextUrl))
  }
  //admin route
  if (
    isAdminRoute &&
    !role?.includes(RoleEnum.ADMIN) &&
    !role?.includes(RoleEnum.SUPER_ADMIN)
  ) {
    return NextResponse.redirect(new URL('/restricted/', request.nextUrl))
  }
  // Redactor route
  if (
    isRedactorRoute &&
    !role?.includes(RoleEnum.ADMIN) &&
    !role?.includes(RoleEnum.SUPER_ADMIN) &&
    !role?.includes(RoleEnum.REDACTOR) &&
    !role?.includes(RoleEnum.MODERATOR)
  ) {
    return NextResponse.redirect(new URL('/restricted/', request.nextUrl))
  }
  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL('/exercises/auth', request.nextUrl))
  }
  NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
