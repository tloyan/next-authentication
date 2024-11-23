import {cookies, headers} from 'next/headers'

import {randomUUID} from 'node:crypto'

import {
  addSession as addSessionDao,
  findSession as findSessionDao,
  deleteSession as deleteSessionDao,
  updateSession as updateSessionDao,
  findSessionByUidUserAgent as findSessionDaoByUidUserAgent,
} from '@/db/sgbd'

import {decrypt, encrypt, EXPIRE_TIME, isExpired} from './crypt'

export async function createSession(uid: string) {
  const expiresAt = new Date(Date.now() + EXPIRE_TIME)
  const sessionId = randomUUID()
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  const sessionByUid = await findSessionDaoByUidUserAgent(uid, userAgent ?? '')

  if (sessionByUid && !isExpired(sessionByUid.expiresAt)) {
    await updateSessionDao({
      sessionId: sessionByUid.sessionId,
      userId: uid,
      expiresAt: expiresAt.toISOString(),
      userAgent,
    })

    const session = await encrypt({
      sessionId: sessionByUid.sessionId,
      expiresAt,
    })
    const cookieStore = await cookies()
    cookieStore.set('session', session)
    return
  }

  await addSessionDao({
    sessionId,
    userId: uid,
    expiresAt: expiresAt.toISOString(),
  })

  const session = await encrypt({sessionId, expiresAt})
  const cookieStore = await cookies()
  cookieStore.set('session', session)
}

export async function verifySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value

  const session = await decrypt(cookie)
  if (!session || !session.sessionId) {
    return
  }

  const sessionDao = await findSessionDao(session.sessionId)
  if (sessionDao && !isExpired(sessionDao.expiresAt)) {
    return {
      isAuth: true,
      userId: sessionDao?.userId,
      sessionId: session.sessionId,
    }
  }

  return {isAuth: false}
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value

  const session = await decrypt(cookie)
  if (session && session.sessionId) {
    await deleteSessionDao(session.sessionId)
  }

  cookieStore.delete('session')
}

//1. 🚀 Update Session
export async function updateSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value

  const session = await decrypt(cookie)
  if (!session || !session.sessionId) {
    return
  }

  // const expiresAt = new Date(Date.now() + EXPIRE_TIME)
  const sessionDao = await findSessionDao(session?.sessionId)
  if (sessionDao) {
    // await updateSessionDao({
    //   sessionId: sessionDao.sessionId,
    //   userId: sessionDao.userId,
    //   expiresAt: expiresAt.toISOString(),
    // })
  }

  // const newSession = await encrypt({sessionId: session.sessionId, expiresAt})
  // cookieStore.set('session', newSession)
}
