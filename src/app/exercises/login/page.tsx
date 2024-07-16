//import LoginForm from '@/app/exercises/auth/form/login-form'
import {getConnectedUser} from '../auth/lib/dal'
import {redirect} from 'next/navigation'
import {SignInGoogle} from './sign-in-google'
import {SignInCredential} from './sign-in-credential'
import {SignInResend} from './sign-in-resend'

export default async function Page() {
  const user = await getConnectedUser()
  if (user) {
    redirect('/exercises/dashboard')
  }
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {/* <LoginForm></LoginForm> */}
      <h1 className="mb-4 text-center text-3xl font-bold">Google</h1>
      <SignInGoogle></SignInGoogle>
      <h1 className="mb-4 text-center text-3xl font-bold">Credentials</h1>
      <SignInCredential />
      <h1 className="mb-4 text-center text-3xl font-bold">Resend</h1>
      <SignInResend />
    </div>
  )
}
