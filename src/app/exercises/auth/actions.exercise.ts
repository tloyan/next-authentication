'use server'

import auth from './lib/auth'
import {LoginFormSchema, SignInError, SignupFormSchema} from './lib/type'

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

  const parsedFields = LoginFormSchema.safeParse({
    email,
    password,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }

  try {
    await auth.signIn(email, password)
  } catch (error) {
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return {message: 'Invalid credentials.'}
        }
        default: {
          return {message: 'Something went wrong.'}
        }
      }
    }
    throw error
  }
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

  const parsedFields = SignupFormSchema.safeParse({
    email,
    password,
    confirmPassword,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }

  try {
    await auth.signUp(email, password)
  } catch (error) {
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return {message: 'Invalid credentials.'}
        }
        default: {
          return {message: 'Something went wrong.'}
        }
      }
    }
    throw error
  }
}

export async function logout() {
  await auth.logout()
}
