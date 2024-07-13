import LoginForm from '@/app/exercises/auth/form/login-form'

import {getConnectedUser} from '@/app/exercises/auth/lib/dal'

import {redirect} from 'next/navigation'
import {SignInGoogle} from './sign-in-google'
import {SignInCredential} from './sign-in-credential'
import {SignInResend} from './sign-in-resend'

async function Page() {
  const userLogged = await getConnectedUser()
  console.log('userLogged:', userLogged)
  if (userLogged) {
    redirect('/exercises/auth')
  }

  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      <h1 className="mb-4 text-center text-3xl font-bold">Form</h1>
      <LoginForm></LoginForm>
      <h1 className="mb-4 text-center text-3xl font-bold">Google</h1>
      <SignInGoogle></SignInGoogle>
      <h1 className="mb-4 text-center text-3xl font-bold">Credntials</h1>
      <SignInCredential />
      <h1 className="mb-4 text-center text-3xl font-bold">Resend</h1>
      <SignInResend />
    </div>
  )
}

export default Page
