'use server'

import auth from './lib/auth'
// 🐶 importe les shémas et type
//import {LoginFormSchema, SignInError, SignupFormSchema} from './lib/type'

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

// 🐶 EXERCICE LOGIN
export async function authenticate(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  console.log('authenticate...', email, password)

  // 🐶 1. Validation des champs

  // 🐶 Utilise `LoginFormSchema.safeParse` pour valider les champs
  // 🤖 const parsedFields = LoginFormSchema.safeParse({ ...

  // 🐶 Si les champs ne sont pas valides, retourne un objet avec les erreurs
  // 🤖
  // return {
  //   errors: parsedFields.error.flatten().fieldErrors,
  //   message: 'Invalid fields.',
  // }

  // 🐶 2. Appel à la librairie d'auth (dans un try catch)
  // 🤖
  // const user = await auth.signIn(email, password)

  // 🐶 3. Gestion des erreurs
  // Dans le cas gère les erreurs de type `SignInError`

  // 🤖
  // const signInError = error as SignInError
  //   if (error) {
  //     switch (signInError.type) {
  //       case 'CredentialsSignin': {
  //         return {message: 'Invalid credentials.'}
  //       }
  //       default: {
  //         return {message: 'Something went wrong.'}
  //       }
  //     }
  //   }
  //   throw error

  // ⛏️ supprime ce return
  return {message: 'Not implemented.'}
}

// 🐶 EXERCICE REGISTER
export async function register(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  console.log('register...', email, password, confirmPassword)

  // 🐶 1. Validation des champs
  // const parsedFields = SignupFormSchema.safeParse

  // 🐶 2. Appel à la librairie d'auth (dans un try catch)
  // 🤖
  // const user = await auth.signUp

  // 🐶 3. Gestion des erreurs

  // ⛏️ supprime ce return
  return {message: 'Not implemented.'}
}

export async function logout() {
  await auth.logout()
}
