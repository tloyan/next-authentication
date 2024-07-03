import 'server-only'

import {cookies} from 'next/headers'

import {randomUUID} from 'node:crypto'
import {
  addSession as addSessionDao,
  findSession,
  updateSession as updateSessionDao,
} from '@/db/sgbd'
import {isExpired, decrypt, encrypt, EXPIRE_TIME} from './crypt'

export async function createSession(uid: string) {
  const expiresAt = new Date(Date.now() + EXPIRE_TIME)

  // 1. Create a session in the database
  const sessionId = randomUUID()

  await addSessionDao({
    sessionId,
    userId: uid,
    expiresAt: expiresAt.toISOString(),
  })

  // 2. Encrypt the session ID
  const session = await encrypt({sessionId, expiresAt})

  // 3. Store the session in cookies for optimistic auth checks
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  console.log('verifySession cookie', cookie, session)

  if (!session || !session.sessionId) {
    console.log('verifySession No session found')
    //redirect('/exercises/auth')
    return
  }
  //GET DB SESSION
  const sessionDao = await findSession(session.sessionId)
  if (sessionDao && !isExpired(sessionDao?.expiresAt)) {
    return {
      isAuth: true,
      userId: sessionDao.userId,
      sessionId: session.sessionId,
    }
  }
  console.log('verifySession Session (database) expired')
  //deleteSession() cannot delete cookie from server side
  return {
    isAuth: false,
  }
}

export async function updateSession() {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return
  }
  //UPDATE DB SESSION
  const expires = new Date(Date.now() + EXPIRE_TIME)
  const sessionDb = await findSession(payload.sessionId as string)
  if (sessionDb) {
    sessionDb.expiresAt = expires.toISOString()
    await updateSessionDao(sessionDb)
  }
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  'use server'
  cookies().delete('session')
  //db.deleteSession()
  // redirect('/login')
}
