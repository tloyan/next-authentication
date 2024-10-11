import {Label} from '@/components/ui/label'
// 🐶 Importe `verifySession` et `getUserById`
// import {verifySession} from './lib/session-stateless'
// import {getUserById} from '@/db/sgbd'

async function Page() {
  // 🐶 Appelle `verifySession` pour récupérer la session
  // const session = await verifySession()
  // 🐶 Récupère l'utilisateur avec l'id de la session
  // const user = await getUserById(session?.userId as string)
  // console.log('Page : user', user)
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {/* 🐶 Affiche le nom de l'utilisateur si disponible */}
      <Label>You are not connected</Label>
    </div>
  )
}
export default Page
