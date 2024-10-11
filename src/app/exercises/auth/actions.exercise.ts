/* eslint-disable @typescript-eslint/no-unused-vars */
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
        //🐶 Notes que nous avons ajouté `role` dans le `FormState`
        role?: string[]
      }
      message?: string
    }
  | undefined

// 🐶 `changeConnectedUserRole` : Cette fonction permet de changer le `role` de l'utilisateur connecté
// sans aucune restriction
// Adapte la pour emepêcher un utilisateur de se donner un `role` supérieur au sien
export async function changeConnectedUserRole(
  _currentState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const requestedRole = formData.get('role') as RoleEnum
  const parsedFields = ChangeRoleSchema.safeParse({
    role: requestedRole,
  })

  // 1.  Si les champs ne sont pas valides, on retourne les erreurs
  if (!parsedFields.success) {
    return {
      errors: parsedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.',
    }
  }
  // 2. On récupère l'utilisateur connecté
  const userConnected = await getConnectedUser()
  if (!userConnected) {
    return {message: 'vous etes pas connecté'}
  }
  // 🐶 Empêche l'appel à `updateUserRole` si le `role` demandé est supérieur au `role` de l'utilisateur connecté
  // Pour cela on va se baser sur l'ordre des rôles
  // const roleHierarchy = [
  //   RoleEnum.USER,
  //   RoleEnum.REDACTOR,
  //   RoleEnum.MODERATOR,
  //   RoleEnum.ADMIN,
  //   RoleEnum.SUPER_ADMIN,
  // ]

  // 🐶 Détermine le niveau de l'utilisateur
  const userRoleIndex = 1
  // 🐶 Détermine le niveau demandé
  const requestedRoleIndex = 1

  // 🐶 Si le `role` demandé est supérieur au `role` de l'utilisateur connecté, on retourne une erreur

  // return {
  //   errors: {
  //     role: [
  //       'Vous ne pouvez pas vous attribuer un rôle avec plus de privilèges',
  //     ],
  //   },
  //   message:
  //     'Vous ne pouvez pas vous attribuer un rôle avec plus de privilèges',
  // }

  // 🐶 Note : Tu peux déplacer ce code dans une fonction `checkRoleHierarchy`

  try {
    await updateUserRole(userConnected.email, requestedRole)
  } catch (error) {
    console.error('changeConnectedUserRole error:', error)
    return {message: 'Something went wrong during update db.', errors: {}}
  }

  revalidatePath('/exercises/auth')
  return {message: 'change role successful'}
}

// 🐶 Adapte cette fonction pour empêcher un utilisateur non admin de changer le role des autres users
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

  // 🐶 Vérifie que le role du `userConnected` est OK

  // SINON on retourne une erreur
  // return {
  //   errors: {
  //     role: ['Seuls les ADMIN et SUPER_ADMIN peuvent changer les rôles'],
  //   },
  //   message: 'Seuls les ADMIN et SUPER_ADMIN peuvent changer les rôles',
  // }

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
