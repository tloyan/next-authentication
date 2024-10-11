import {SessionPayload} from './type'

const ONE_MINUTE = 60 * 1000
export const EXPIRE_TIME = 10 * ONE_MINUTE //Expires in 10 minutes

export async function encrypt(payload: SessionPayload) {
  console.log(`Encrypt ... payload`, payload)
  return JSON.stringify(payload)
}

export async function decrypt(
  session: string | undefined = ''
): Promise<SessionPayload | undefined> {
  if (!session) {
    return
  }
  const payload = JSON.parse(session)
  return payload
}

export const isExpired = (expiresAt?: string) => {
  if (!expiresAt) {
    return true
  }
  return new Date(expiresAt) < new Date()
}
