import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'
import {decrypt} from './app/exercises/auth/lib/crypt'

const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])
const publicRoutes = new Set(['/'])

// 🐶 Spécifie les routes 'admin'
// 'isAdminRoute' est un Set qui contient les routes admin

// 🐶 Spécifie les routes 'redactor'
// 'isRedactorRoute' est un Set qui contient les routes redactor

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path)
  const isPublicRoute = publicRoutes.has(path)

  // 🐶 Vérifie si la route est une route admin
  // 🤖 isAdminRoute

  // 🐶 Vérifie si la route est une route redactor
  // 🤖 isRedactorRoute
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)

  const hasSession = session?.userId || session?.sessionId

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/exercises/login', request.nextUrl))
  }

  // 🐶 Redirige l'utilisateur si la route est une route admin
  // Redirige vers '/restricted/' si l'utilisateur n'est pas admin

  // 🐶 Redirige l'utilisateur si la route est une route redactor
  // Redirige vers '/restricted/' si l'utilisateur n'est pas redactor ou admin

  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL('/exercises/auth', request.nextUrl))
  }
  NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
