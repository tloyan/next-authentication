'use server'

import {RoleEnum} from '@/lib/type'
import {auth} from './lib/auth'
import {
  ChangeRoleSchema,
  ChangeUserRoleSchema,
  LoginFormSchema,
  SignInError,
  SignupFormSchema,
  UserDTO,
} from './lib/type'
import {getConnectedUser} from './lib/dal'
import {revalidatePath} from 'next/cache'
import {getUserByEmail, updateUserRole} from '@/db/sgbd'

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
        role?: string[]
      }
      message?: string
    }
  | undefined

export async function changeConnectedUserRole(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const requestedRole = formData.get('role') as RoleEnum
  const parsedFields = ChangeRoleSchema.safeParse({
    role: requestedRole,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  const userConnected = await getConnectedUser()
  if (!userConnected) {
    return {message: 'vous etes pas connecté'}
  }
  // Tout le monde peut changer de rôle sauf pour les rôles ADMIN et SUPER_ADMIN
  if (checkRoleHierarchy(userConnected, requestedRole)) {
    return checkRoleHierarchy(userConnected, requestedRole)
  }
  try {
    await updateUserRole(userConnected.email, requestedRole)
  } catch (error) {
    console.error('changeConnectedUserRole error:', error)
    return {message: 'Something went wrong during update db.', errors: {}}
  }

  revalidatePath('/exercises/auth')
  return {message: 'change role successful'}
}

function checkRoleHierarchy(
  userConnected: UserDTO,
  requestedRole: RoleEnum
): FormState {
  // Définir l'ordre des privilèges
  const roleHierarchy = [
    RoleEnum.USER,
    RoleEnum.REDACTOR,
    RoleEnum.MODERATOR,
    RoleEnum.ADMIN,
    RoleEnum.SUPER_ADMIN,
  ]
  const useRole = userConnected?.role ?? RoleEnum.USER
  const userRoleIndex = roleHierarchy.indexOf(useRole)
  const requestedRoleIndex = roleHierarchy.indexOf(requestedRole)

  if (requestedRoleIndex > userRoleIndex) {
    return {
      errors: {
        role: [
          'Vous ne pouvez pas vous attribuer un rôle avec plus de privilèges',
        ],
      },
      message:
        'Vous ne pouvez pas vous attribuer un rôle avec plus de privilèges',
    }
  }
}

function checkIsAdmin(userConnected: UserDTO): FormState {
  if (
    userConnected.role !== RoleEnum.ADMIN &&
    userConnected.role !== RoleEnum.SUPER_ADMIN
  ) {
    return {
      errors: {
        role: ['Seuls les ADMIN et SUPER_ADMIN peuvent changer les rôles'],
      },
      message: 'Seuls les ADMIN et SUPER_ADMIN peuvent changer les rôles',
    }
  }
}

export async function changeUserRole(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const requestedRole = formData.get('role') as RoleEnum
  const requestedEmail = formData.get('email') as string

  const parsedFields = ChangeUserRoleSchema.safeParse({
    role: requestedRole,
    email: requestedEmail,
  })

  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  const userConnected = await getConnectedUser()
  if (!userConnected) {
    return {message: 'vous etes pas connecté'}
  }
  // Tout le monde peut changer de rôle sauf pour les rôles ADMIN et SUPER_ADMIN
  if (checkIsAdmin(userConnected)) {
    return checkIsAdmin(userConnected)
  }
  const user = await getUserByEmail(requestedEmail)
  if (!user) {
    return {
      errors: {
        email: ['Utilisateur non trouvé'],
      },
      message: 'Impossible de changer le role',
    }
  }
  try {
    await updateUserRole(requestedEmail, requestedRole)
  } catch (error) {
    console.error('changeConnectedUserRole error:', error)
    return {message: 'Something went wrong during update db.', errors: {}}
  }

  revalidatePath('/exercises/auth')
  return {message: 'change role successful'}
}

export async function authenticate(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('authenticate...')
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
    const user = await auth.signIn(email, password)
    console.log('Signed in:', user)
  } catch (error) {
    console.error('authenticate error:', error)
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

export async function register(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('register...')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

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
    const user = await auth.signUp(email, password)
    console.log('Signed UP:', user)
  } catch (error) {
    console.log('register error:', error)
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return {message: 'Invalid credentials.'}
        }
        default: {
          return {message: `Something went wrong.${error}`}
        }
      }
    }
    throw error
  }
}

export async function logout() {
  await auth.logout()
}
