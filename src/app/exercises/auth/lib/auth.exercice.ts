/* eslint-disable @typescript-eslint/no-unused-vars */
import {RoleEnum} from '@/lib/type'
// 🐶 Importe `bcrypt` from `'bcrypt'`
import bcrypt from 'bcrypt'

// 🐶 Importe `bcrypt` from 'addUser' 'getUserByEmail'
import {addUser, getUserByEmail} from '@/db/sgbd'
import {SignInError, SignUpError} from './type'

const signUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Signing up...', email, password)

  try {
    const user = await getUserByEmail(email)
    if (user) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: 'CredentialsSignup',
        message: 'User Already Exist.',
      } as SignUpError
    }
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = {
      email,
      password: hashedPassword,
      name: 'Not used',
      role: RoleEnum.USER,
    }
    const createdUser = await addUser(newUser)
    return {email: createdUser.email, role: createdUser.role}
  } catch (error) {
    console.error(error)
  }
}

const signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('signIn ...', email, password)

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: 'CredentialsSignin',
        message: 'Invalid User.',
      } as SignInError
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Invalid credentials.')
    }

    return {email: user.email, role: user.role}
  } catch (error) {
    console.error(error)
  }
}

async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {message: 'Logout successful'}
}

export const auth = {signIn, signUp, logout}
