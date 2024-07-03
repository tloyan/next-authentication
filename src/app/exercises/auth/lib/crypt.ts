import {SessionPayload} from './type'
import {SignJWT, jwtVerify} from 'jose'

const ONE_MINUTE = 60 * 1000
export const EXPIRE_TIME = 10 * ONE_MINUTE //expires in 1 minutes
const secretKey = process.env.SESSION_SECRET
const useJwt = process.env.SESSION_USE_JWT === 'true'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  console.log(`Encrypt ... useJwt:${useJwt} payload`, payload)

  if (useJwt) {
    console.log('Encrypt with JWT')
    return new SignJWT(payload)
      .setProtectedHeader({alg: 'HS256'})
      .setIssuedAt()
      .setExpirationTime('1hr')
      .sign(key)
  } else {
    console.log('Encrypt with JSON')
    return JSON.stringify(payload)
  }
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
      console.error('decrypt error:', error)
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
