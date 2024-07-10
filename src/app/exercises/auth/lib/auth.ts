import {RoleEnum} from '@/lib/type'

const signUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Signing up...', email, password)

  // ⚠️ en cas d'erreur de signup on peut lancer une erreur de type SignInError
  // throw {
  //   type: 'CredentialsSignin',
  //   message: 'Invalid User.',
  // } as SignInError
  return {email, role: RoleEnum.USER}
}

const signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('signIn ...', email, password)
  return {email, role: RoleEnum.USER}
}

async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {message: 'Logout successful'}
}

const auth = {signIn, signUp, logout}

export default auth
