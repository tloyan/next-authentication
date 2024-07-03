import {Label} from '@/components/ui/label'

import LoginForm from '@/app/exercises/auth/form/login-form'
import Logout from '@/app/exercises/logout/logout'

import {getConnectedUser} from '@/app/exercises/auth/lib/dal'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {!userLogged && <LoginForm></LoginForm>}
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <Logout user={userLogged}></Logout>
        </>
      )}
    </div>
  )
}
