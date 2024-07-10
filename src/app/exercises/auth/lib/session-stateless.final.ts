import 'server-only'

import {cookies} from 'next/headers'

import {EXPIRE_TIME, decrypt, encrypt} from './crypt'
import {getUserById} from '@/db/sgbd'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + EXPIRE_TIME)
  const session = await encrypt({userId, expiresAt})

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  console.log('verifySession cookie', cookie, session)

  if (!session || !session.userId) {
    console.log('verifySession No session found')
    return
  }

  return {isAuth: true, userId: session.userId}
}

export function deleteSession() {
  cookies().delete('session')
}

export const getConnectedUser = async () => {
  const session = await verifySession()
  if (!session || !session?.isAuth) return
  console.log('getConnectedUser', session)
  try {
    const user = await getUserById(session.userId as string)
    return user
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
}
