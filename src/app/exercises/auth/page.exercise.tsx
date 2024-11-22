import {Label} from '@/components/ui/label'
import {verifySession} from './lib/session-stateless'
import {getUserById} from '@/db/sgbd'

async function Page() {
  const session = await verifySession()
  const user = await getUserById(session?.userId as string)
  console.log('Page : user', user)
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {/* 🐶 Affiche le nom de l'utilisateur si disponible */}
      {user?.name && <p>{user.name}</p>}
      <Label>You are not connected</Label>
    </div>
  )
}
export default Page
