import {Label} from '@/components/ui/label'

import {getConnectedUser} from '@/app/exercises/auth/lib/dal'
import Logout from '@/app/exercises/logout/logout'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <Logout user={userLogged}></Logout>
        </>
      )}
      {!userLogged && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl">No user connected</Label>
          <div>
            <Button>
              <Link href="/exercises/auth/login"> Login</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
