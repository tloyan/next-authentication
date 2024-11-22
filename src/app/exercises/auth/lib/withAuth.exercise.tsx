import React from 'react'
import {getConnectedUser} from './dal'
import {Label} from '@/components/ui/label'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return async function WithAuth(props: P) {
    const user = await getConnectedUser()
    console.log(user)

    if (!user) {
      return (
        <div className="mx-auto max-w-2xl p-6 text-center text-lg">
          <Label className="text-l mb-4">You are not connected</Label>
        </div>
      )
    }
    return <WrappedComponent {...props} user={user} />
  }
}

export default withAuth
