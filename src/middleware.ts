import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'
import {EXPIRE_TIME, decrypt, encrypt} from './app/exercises/auth/lib/crypt'

//cannot import bcrypt
//https://nextjs.org/learn/dashboard-app/adding-authentication

// 1. Specify protected and public routes
const protectedRoutes = new Set([
  '/exercises/dashboard',
  '/exercises/bank-account',
])
const publicRoutes = new Set(['/login', '/signup', '/'])

export async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path) // ||    [...protectedRoutes].some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.has(path) //||    [...publicRoutes].some((route) => path.startsWith(route))
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  console.log('middleware session', session)
  console.log('middleware isProtectedRoute', isProtectedRoute)
  console.log('middleware isPublicRoute', isPublicRoute)

  const hasSession = session?.userId || session?.sessionId
  // 4. Redirect
  //si on est pas connecté et qu'on est sur une page protégée on redirige vers la page login
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL('/exercises/login', request.nextUrl))
  }
  //si on est connecté et qu'on est sur une page public on redirige vers la page exercises
  if (
    isPublicRoute &&
    hasSession &&
    !request.nextUrl.pathname.startsWith('/exercises')
  ) {
    return NextResponse.redirect(new URL('/exercises', request.nextUrl))
  }

  //return NextResponse.next()

  //return await updateSession(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

// 5. Update the session
// cela permet d'etendre la durée de vie de la session
// attention cela n'etend pas la durée de vie de la session en base de donnée (doit etre update hors du middleware)
export async function updateSession(request: NextRequest) {
  const cookie = request.cookies.get('session')?.value
  const session = await decrypt(cookie)
  if (!session) return
  // Refresh the session so it doesn't expire
  //const parsed = JSON.parse(session) //await decrypt(session)

  session.expiresAt = new Date(Date.now() + EXPIRE_TIME)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expiresAt,
  })
  //updateSession() // on ne peut pas updateSessionDb middleware is edge env
  console.log('middleware updateSession', session)
  return res
}
