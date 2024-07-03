import {addUser, getUserByEmail} from '@/db/sgbd'
import {RoleEnum} from '@/lib/type'
import bcrypt from 'bcrypt'

import {createSession, deleteSession} from './session'
import {SignInError} from './type'

const signUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = await getUserByEmail(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)

  // Hachage du mot de passe avec le salt
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = {
    email,
    password: hashedPassword,
    name: 'John Doe',
    role: RoleEnum.SUPER_ADMIN, //RoleEnum.USER,
  }
  const createdUser = await addUser(newUser)
  await createSession(createdUser.id)
  return {email: newUser.email, role: newUser.role}
}

const signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = await getUserByEmail(email)
  console.log('Auth : signIn ...', email, password, user)
  if (!user) {
    // eslint-disable-next-line no-throw-literal
    throw {
      type: 'CredentialsSignin',
      message: 'Invalid User.',
    } as SignInError
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    // eslint-disable-next-line no-throw-literal
    throw {
      type: 'CredentialsSignin',
      message: 'Invalid credentials.',
    } as SignInError
  }
  await createSession(user.id)
  return {email: user.email, role: user.role}
}

async function logout() {
  deleteSession()
  return {message: 'Logout successful'}
}

// create a session

// export async function getUserFromDatabaseSession() {
//   const sessionId = cookies().get('session')?.value
//   const session = await findSession(sessionId ?? '')
//   const user = await getUserById(session?.userId ?? '')
//   return user
// }

// export async function getUserFromCookiesSession() {
//   const userCookie = cookies().get('session')
//   console.log('User cookie:', userCookie)
//   if (userCookie && userCookie.value) {
//     try {
//       const authSession: AuthSession = JSON.parse(userCookie.value)
//       const dbUser = await getUserByEmail(authSession.user.email) //todo react cache
//       console.log('User logged:', dbUser)
//       return dbUser
//     } catch (error) {
//       console.error('Failed to parse user cookie', error)
//       return
//     }
//   }
//   return
// }
const auth = {signIn, signUp, logout}
export default auth
