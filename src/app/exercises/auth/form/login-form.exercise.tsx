// 🐶 Met le type de composant (RCC ou RSC)
// 🐶 importe 'useActionState' et 'useFormStatus'
// 🤖 import {useFormStatus} from 'react-dom'
// 🤖 import {useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

// 🐶 importe la fonction 'authenticate' depuis le server action
//import {authenticate} from '@/app/exercises/auth/actions'
export default function LoginForm() {
  // 🐶 utilise le hook 'useActionState'
  // 🤖 const [actionState, authenticateAction] ...
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
      {/* 🐶 Ajoute l'action au <form> */}
      <form>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4"
        />
        {/* 🐶 gère l'erreur sur ce champs  */}
        {/* 🤖 className="text-sm text-red-500" */}
        {/* 🤖 `actionState.errors.email` */}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4"
        />
        {/* 🐶 gère l'erreur sur ce champs  */}

        <LoginButton />
        {/* 🐶 gère l'erreur globale  */}
        {/* 🤖 `actionState.message` */}
      </form>
    </div>
  )
}
function LoginButton() {
  // 🐶 gère le status pending avec 'useFormStatus'
  return <Button type="submit">Login</Button>
}
