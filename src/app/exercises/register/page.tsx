import {Label} from '@/components/ui/label'
import RegisterForm from '../auth/form/register-form'
import {getConnectedUser} from '@/app/exercises/auth/lib/dal'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {!userLogged && <RegisterForm></RegisterForm>}
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
        </>
      )}
    </div>
  )
}
