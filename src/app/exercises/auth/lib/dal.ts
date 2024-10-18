import 'server-only'
import {cache, experimental_taintUniqueValue as taintUniqueValue} from 'react'
import {getUserByEmail} from '@/db/sgbg-unstorage'
import {User} from '@/lib/type'
import {UserDTO} from './type'
import {auth} from '@/auth'

export const getConnectedUser = cache(async () => {
  //const session = await verifySession()
  const session = await auth()
  if (!session?.user || !session.user.email) return
  console.log('getConnectedUser session.user', session.user)
  try {
    const user = await getUserByEmail(session.user.email as string)
    if (!user) return
    return userDTO(user as User)
  } catch (error) {
    console.error('Failed to fetch user', error)
    return
  }
})

export function userDTO(user: User): UserDTO | undefined {
  if (!user) return undefined
  taintUniqueValue('Do not pass password to the client.', user, user?.password)
  // Autre exemple
  // experimental_taintObjectReference(
  //   'Do not pass ALL environment variables to the client.',
  //   process.env
  // )
  return {
    email: user?.email ?? '',
    name: user?.name,
    role: user?.role,
    //password: user?.password,
  }
}
