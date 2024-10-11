import {SessionPayload} from './type'

// 🐶 Importe les 2 fonctions de `JWT`
// 🤖 import {SignJWT, jwtVerify} from 'jose'
const ONE_MINUTE = 60 * 1000
export const EXPIRE_TIME = 10 * ONE_MINUTE //Expires in 10 minutes

// 🐶 Déclare la clé secrète (fichier .env.local)
// 🤖 const secretKey = process.env.SESSION_SECRET

// 🐶 Déclare si on utilise `JWT` ou non (fichier .env.local)
// 🤖 const useJwt = process.env.SESSION_USE_JWT === 'true'

// 🐶 Encode la clé secrète
// 🤖 const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  console.log(`Encrypt ... payload`, payload)
  // 🐶 Si `useJwt` alors retourne le `payload` encrypter avec `SignJWT`
  // - Utilise `{alg: 'HS256'}` pour le `ProtectedHeader`
  // - `setIssuedAt()` pour la date de création
  // - `setExpirationTime('1hr')` pour la date d'expiration
  // - `sign(key)` pour signer le `payload`

  // 🐶 Sinon retourne le `payload` en `JSON`
  return JSON.stringify(payload)
}

export async function decrypt(
  session: string | undefined = ''
): Promise<SessionPayload | undefined> {
  if (!session) {
    return
  }
  // 🐶 Si `useJwt` decrypte la session avec `jwtVerify`
  // 🤖 jwtVerify(session, key, ...
  // 🤖 algorithms: ['HS256'], ...
  // Retourne le `payload` (payload as SessionPayload)
  // 🐶 Gère les erreurs avec un `try/catch` et retourne `undefined` en cas d'erreur
  // 🐶 Sinon parse le `JSON` et retourne le `payload`
  const payload = JSON.parse(session)
  return payload
}

export const isExpired = (expiresAt?: string) => {
  if (!expiresAt) {
    return true
  }
  return new Date(expiresAt) < new Date()
}
