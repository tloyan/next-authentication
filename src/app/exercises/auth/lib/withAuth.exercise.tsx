/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
// 🐶 Importe `getConnectedUser`
// 🤖 import {getConnectedUser} from './dal'
import {Label} from '@/components/ui/label'

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return async function WithAuth(props: P) {
    // 🐶 Appelle `getConnectedUser`
    const user = ''

    if (!user) {
      return (
        // 🐶 Implémente ici le code quand le `user` n'est pas connecté
        <></>
        // <div className="mx-auto max-w-2xl p-6 text-center text-lg">
        //   <Label className="text-l mb-4">You are not connected</Label>
        // </div>
      )
    }
    // 🐶 Implémente ici le code quand le `user` est connecté
    // C'est à dire `return <WrappedComponent>` avec touts les `props` et `user` en plus
    return <></>
  }
}

export default withAuth
