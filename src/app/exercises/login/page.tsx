import LoginForm from '@/app/exercises/auth/form/login-form'

import {getConnectedUser} from '@/app/exercises/auth/lib/dal'

import {redirect} from 'next/navigation'

async function Page() {
  const userLogged = await getConnectedUser()
  if (userLogged) {
    redirect('/exercises/auth')
  }

  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      <LoginForm></LoginForm>
    </div>
  )
}

export default Page
