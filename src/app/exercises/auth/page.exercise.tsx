import {Label} from '@/components/ui/label'
//⛏️ supprime import 'getConnectedUser' nous n'en avons plus besoin
import {getConnectedUser} from './lib/dal'
// 🐶 importe le HOC 'withAuth'

// 🐶 Ajoute le prop 'user' de type 'UserDTO' à Page (le HOC va l'injecter)
async function Page() {
  //⛏️ supprime 'getConnectedUser' nous n'en avons plus besoin
  const user = await getConnectedUser()
  console.log('Page : user', user)

  // 🐶 Utilise directement le composant sans avoir a gerer la logique du user non connecté
  // le HOC t'assure que le user est connecté.
  // Affiche seulement le message de bienvenue
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
// 🐶 Ajoute le HOC withAuth
export default Page
