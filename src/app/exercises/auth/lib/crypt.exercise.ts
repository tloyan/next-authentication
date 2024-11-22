import {SessionPayload} from './type'

import {SignJWT, jwtVerify} from 'jose'
const ONE_MINUTE = 60 * 1000
export const EXPIRE_TIME = 10 * ONE_MINUTE //Expires in 10 minutes
const secretKey = process.env.SESSION_SECRET
const useJwt = process.env.SESSION_USE_JWT === 'true'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  console.log(`Encrypt ... payload`, payload)
  if (useJwt) {
    return await new SignJWT(payload)
      .setProtectedHeader({alg: 'HS256'})
      .setIssuedAt()
      .setExpirationTime('1hr')
      .sign(key)
  }

  return JSON.stringify(payload)
}

export async function decrypt(
  session: string | undefined = ''
): Promise<SessionPayload | undefined> {
  if (!session) {
    return
  }
  if (useJwt) {
    try {
      const {payload} = await jwtVerify(session, key, {
        algorithms: ['HS256'],
      })
      return payload as SessionPayload
    } catch (error) {
      console.error(error)
      return
    }
  } else {
    const payload = JSON.parse(session)
    return payload
  }
}

export const isExpired = (expiresAt?: string) => {
  if (!expiresAt) {
    return true
  }
  return new Date(expiresAt) < new Date()
}
