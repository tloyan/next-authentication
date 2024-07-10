//1. 🚀 Gestion status pending via state (logout)

// 🐶 Met le type de composant (RCC ou RSC)
import {Button} from '@/components/ui/button'
// 🐶 importe logout de la lib auth
// 🤖 import {logout} from '../actions'

export default function Logout() {
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Déconnexion</h1>
      <LogoutButton />
    </div>
  )
}
function LogoutButton() {
  // 🐶 Crée un state `pending`` avec la valeur initiale ``false``
  // const [pending, setPending] ...

  // 🐶 Créé une fonction `handleClick`
  // 🤖 const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  // - 🐶 Met à jour le state `pending` à `true`
  // - 🐶 Appelle 🤖 await logout()
  // - 🐶 Met à jour le state `pending` à `false`

  // 🐶 active / desactive le button sur le state pending
  // 🐶 utilise `handleClick`
  return <Button>Logout</Button>
}
