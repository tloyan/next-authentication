import {RoleEnum} from '@/lib/type'
// 🐶 import bcrypt from 'bcrypt'
// import bcrypt from 'bcrypt'

// 🐶 import bcrypt from 'addUser' 'getUserByEmail'
// import {addUser, getUserByEmail} from '@/db/sgbd'
// import {SignInError} from './type'

const signUp = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('Signing up...', email, password)

  // 🐶 1. Verification de l'utilisateur en BDD
  // Lève une erreur si l'utilisateur existe déjà
  // 🤖 const user = await getUserByEmail(email)

  // 🐶 2. Hachage du mot de passe
  // https://github.com/kelektiv/node.bcrypt.js?tab=readme-ov-file#to-hash-a-password
  const saltRounds = 10
  const salt = 'salt' // 🤖 await bcrypt.genSalt(saltRounds)

  // Hachage du mot de passe avec le salt
  const hashedPassword = 'hashedPassword' // 🤖 await bcrypt.hash(password, salt  )

  const newUser = {
    email,
    password: hashedPassword,
    name: 'Not used',
    role: RoleEnum.USER,
  }
  // 🐶 3. Ajout de l'utilisateur en BDD
  // 🤖 const createdUser = await addUser(newUser)

  // 🐶 4. Retourne l'utilisateur créé
  return {email, role: RoleEnum.USER}
}

const signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('signIn ...', email, password)

  // 🐶 1. Verification de l'utilisateur en BDD
  // 🤖 getUserByEmail

  // Lève une erreur si l'utilisateur n'existe pas
  // 🤖
  // if (!user) {
  //   // eslint-disable-next-line no-throw-literal
  //   throw {
  //     type: 'CredentialsSignin',
  //     message: 'Invalid User.',
  //   } as SignInError
  // }

  // 🐶 2. Comparaison du mot de passe
  // 🤖 bcrypt.compare

  // Lève une erreur si le mot de passe ne correspond pas : message: 'Invalid credentials.'
  // 🐶 Retourne le user de BDD.
  return {email, role: RoleEnum.USER}
}

async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {message: 'Logout successful'}
}

export const auth = {signIn, signUp, logout}
