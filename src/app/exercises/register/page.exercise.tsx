import RegisterForm from '@/app/exercises/auth/form/register-form'

// 🐶 Importe 'getConnectedUser' et "redirect"
// 🤖 import {getConnectedUser} from '../auth/lib/dal'
// 🤖 import {redirect} from 'next/navigation'

export default function Page() {
  // 🐶 recupère le user connecté (getConnectedUser)
  // 🐶 s'il est défini alors fait une redirection vers /exercises/logout
  return (
    <div className="mx-auto max-w-2xl p-6 text-lg ">
      <RegisterForm></RegisterForm>
    </div>
  )
}
