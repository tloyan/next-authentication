import 'server-only'

import {cookies} from 'next/headers'

import {EXPIRE_TIME, decrypt, encrypt} from './crypt'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + EXPIRE_TIME)
  const session = await encrypt({userId, expiresAt})
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)
  console.log('verifySession cookie', cookie, session)

  if (!session || !session.userId) {
    console.log('verifySession No session found')
    return
  }

  return {isAuth: true, userId: session.userId}
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
