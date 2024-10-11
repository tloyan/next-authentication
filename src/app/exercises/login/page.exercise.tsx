import LoginForm from '@/app/exercises/auth/form/login-form'

// 🐶 Importe `getConnectedUser` et `redirect`
// 🤖 import {getConnectedUser} from '../auth/lib/dal'
// 🤖 import {redirect} from 'next/navigation'

export default function Page() {
  // 🐶 Récupère le `user` connecté (`getConnectedUser`)
  // 🐶 S'il est défini alors fait une redirection vers `/exercises/dashboard`
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      <LoginForm></LoginForm>
    </div>
  )
}
