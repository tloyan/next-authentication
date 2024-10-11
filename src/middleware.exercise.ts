/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextResponse, type NextRequest} from 'next/server'
//🐶 Importe `Cookies`
//🤖 import {cookies} from 'next/headers'

//🐶 1. Définies les routes privées et publiques dans un `Set`

// 🤖 const protectedRoutes
// Privés
// '/exercises/dashboard',
// '/exercises/bank-account',

// 🤖 const publicRoutes
// Publics
// '/',

export async function middleware(request: NextRequest) {
  //🐶 2. Vérifie si la route courante est privée ou publique
  const path = request.nextUrl.pathname

  // 🐶 Base toi sur `path`, `protectedRoutes` et `publicRoutes`
  // pour determiner les 2 constantes ci-desous
  const isProtectedRoute = false
  const isPublicRoute = true

  // 🐶 3. Récupère le cookie de session
  // 🤖 const cookie = cookies().get('session')?.value
  // 🤖 const session = await decrypt(cookie)

  // 🐶 4. Vérifie si l'utilisateur a une session (session?.userId || session?.sessionId)
  const hasSession = false

  // 🐶 5. Redirige vers `/exercises/login` si la route est privée et qu'il n'y a pas de session
  // 📑 https://nextjs.org/docs/app/building-your-application/routing/redirecting#nextresponseredirect-in-middleware

  // 🐶 6. Redirige vers `/exercises/auth` si la route est publique et qu'il y a une session

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
