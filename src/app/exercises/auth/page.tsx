import {Label} from '@/components/ui/label'

import Logout from '@/app/exercises/logout/logout'
import {getConnectedUser} from './lib/dal'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import ChangeRoleForm from './form/change-role-form'
import {RoleEnum} from '@/lib/type'
import AdminChangeRoleForm from './form/admin-role-form'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {!userLogged && <Label> You are not connected</Label>}
      <div>
        {!userLogged && (
          <div className="space-x-1">
            <Button>
              <Link href="/exercises/login"> Login</Link>
            </Button>
            <Button>
              <Link href="/exercises/register"> Register</Link>
            </Button>
          </div>
        )}
      </div>
      {userLogged && (
        <>
          <h1 className="mb-4 mt-4   text-center text-3xl font-bold">
            Page de gestion du compte
          </h1>
          <Label className="text-l">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <Logout user={userLogged}></Logout>
          <ChangeRoleForm />
          {(userLogged.role === RoleEnum.ADMIN ||
            userLogged.role === RoleEnum.SUPER_ADMIN) && (
            <AdminChangeRoleForm />
          )}
        </>
      )}
    </div>
  )
}
