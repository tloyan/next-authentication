//1. 🚀 Cache
import {Label} from '@/components/ui/label'
import {verifySession} from './lib/session-stateless'
import {getUserById} from '@/db/sgbd'
// 🐶 Importe `cache` de react
// import {cache} from 'react'

async function Page() {
  // 🐶 Remplace `verifySession/getUserById` par `getConnectedUser` (à implementer en bas du fichier)
  // const user = await getConnectedUser()
  const session = await verifySession()
  const user = await getUserById(session?.userId as string)
  console.log('Page : user', user)
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {user ? (
        <Label>Hello {user.email}</Label>
      ) : (
        <Label>You are not connected</Label>
      )}
    </div>
  )
}
export default Page

// 🐶 Ajoute cette fonction en cache
// https://react.dev/reference/react/cache
export const getConnectedUser = async () => {
  // 🐶 Utilise `verifySession` et `getUserById` pour retourner le `user` ou `undefined`
}
