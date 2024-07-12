import {cookies} from 'next/headers'
import {randomUUID} from 'node:crypto'
import {
  addSession as addSessionDao,
  findSession as findSessionDao,
  deleteSession as deleteSessionDao,
} from '@/db/sgbd'
import {decrypt, encrypt, EXPIRE_TIME, isExpired} from './crypt'

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
    return
  }
  //GET DB SESSION
  const sessionDao = await findSessionDao(session.sessionId)
  if (sessionDao && !isExpired(sessionDao?.expiresAt)) {
    return {
      isAuth: true,
      userId: sessionDao.userId,
      sessionId: session.sessionId,
    }
  }
  console.log('verifySession Session (database) expired')

  return {
    isAuth: false,
  }
}

export async function deleteSession() {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  if (session) {
    deleteSessionDao(session.sessionId ?? '')
  }
  cookies().delete('session')
}

export function updateSession() {}
