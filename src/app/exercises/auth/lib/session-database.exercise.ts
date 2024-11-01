//⛏️ Supprime ces imports, tu n'en as pas besoin
import {
  createSession as createSessionStateLess,
  deleteSession as deleteSessionStateLess,
  verifySession as verifySessionStateless,
} from './session-stateless'

// 🐶 Importe `cookies`
// import {cookies} from 'next/headers'

// 🐶 Importe `randomUUID` il va te permettre de générer des `sessionId`
// import {randomUUID} from 'node:crypto'

// 🐶 Importe les fonctions de persistance de session
// import {
//   addSession as addSessionDao,
//   findSession as findSessionDao,
//   deleteSession as deleteSessionDao,
// } from '@/db/sgbd'

// 🐶 Importe ce dont tu as besoin pour créer les sessions
//import {decrypt, encrypt, EXPIRE_TIME, isExpired} from './crypt'

export async function createSession(uid: string) {
  //⛏️ Supprime cette ligne
  return await createSessionStateLess(uid)

  // 🐶 1. Création de la session

  //  🐶 Crée `expiresAt`, une date d'expiration (similaire à session-stateless)
  //  🐶 Crée un `sessionId` avec `randomUUID`

  //  🐶 Ajoute la session dans la base de données
  //  🤖
  // await addSessionDao({
  //   sessionId,
  //   userId: uid,
  //   expiresAt: expiresAt.toISOString(),
  // })

  // 🐶 2. Encrypte la session ({sessionId, expiresAt})
  // const session = await encrypt({sessionId, expiresAt})

  // 🐶 3. Stocke la session dans les cookies
  // 🤖  const cookieStore = await cookies()
  // cookieStore.set('session', session ...
}

export async function verifySession() {
  //⛏️ Supprime cette ligne
  return await verifySessionStateless()

  // 🐶 Récupère le cookie de la session
  // 🤖 const cookie = cookies().get('session')?.value

  // 🐶 Décrypte la session (similaire à session-stateless)

  // 🐶 Si la session n'est pas valide (session où sessionId non défini), on s'arrêtte la `return`

  // 🐶 Récupération de la session en base de données avec `findSessionDao`
  // 🐶 Si la session existe et n'est pas expirée (isExpired), on retourne les informations de l'utilisateur
  // return {
  //   isAuth: true,
  //   userId: sessionDao.userId,
  //   sessionId: session.sessionId,
  // }
  // 🐶 Sinon on retourne {isAuth: false}
}

export function deleteSession() {
  //⛏️ Supprime cette ligne
  return deleteSessionStateLess()

  // 🐶 Récupère le cookie de la session
  // 🤖 const cookie = cookies().get('session')?.value

  // 🐶 Décrypte la session (similaire à session-stateless)
  // 🐶 Si la session est valide, on supprime la session de la base de données

  // 🐶 Supression du cookie : cookies().delete
}

//1. 🚀 Update Session
export function updateSession() {}
