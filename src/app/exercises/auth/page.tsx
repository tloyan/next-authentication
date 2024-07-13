import {Label} from '@/components/ui/label'

import {getConnectedUser} from './lib/dal'
import ChangeRoleForm from './form/change-role-form'
import {RoleEnum} from '@/lib/type'
import AdminChangeRoleForm from './form/admin-role-form'
import withAuth from './lib/withAuth'
//import {getProducts} from '@/db/sgbg-unstorage'

async function Page() {
  //const products = await getProducts()
  const userLogged = await getConnectedUser()
  // console.log('user', userLogged?.email ?? 'no user logged')
  // console.log('products', products)
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {!userLogged && <Label> You are not connected</Label>}
      {userLogged && (
        <>
          <h1 className="mb-4 mt-4   text-center text-3xl font-bold">
            Page de gestion du compte
          </h1>

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
export default withAuth(Page)
