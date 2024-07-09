import React from 'react'
import {getConnectedUser} from './dal'
//import {redirect} from 'next/navigation'

import {Label} from '@/components/ui/label'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

// HOC pour vérifier si l'utilisateur est connecté
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return async function WithAuth(props: P) {
    const userLogged = await getConnectedUser()

    return userLogged ? (
      <>
        <div className="mx-auto max-w-2xl p-6 text-center text-lg">
          <Label className="text-l">
            User connected {userLogged?.email} ({userLogged.role})
          </Label>
          <div className="mt-4 flex justify-center">
            <Button>
              <Link href="/exercises/logout">Aller a Logout</Link>
            </Button>
          </div>
        </div>
        <WrappedComponent {...props} />
      </>
    ) : (
      <div className="mx-auto max-w-2xl p-6 text-center text-lg">
        <div className="mb-4">
          <Label className="text-l">You are not connected</Label>
        </div>
        <div className="flex justify-center space-x-1">
          <Button>
            <Link href="/exercises/login">Login</Link>
          </Button>
          <Button>
            <Link href="/exercises/register">Register</Link>
          </Button>
        </div>
      </div>
    )
  }
}

export default withAuth
