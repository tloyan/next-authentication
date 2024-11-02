// 🐶 Met le type de composant (RCC ou RSC)
// 🐶 importe 'useActionState' et 'useFormStatus'
// 🤖 import {useFormStatus} from 'react-dom'
// 🤖 import {useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

// 🐶 importe la fonction 'register' depuis le server action
//import {register} from '@/app/exercises/auth/actions'
export default function RegisterForm() {
  // 🐶 utilise le hook 'useActionState'
  // 🤖 const [actionState, registerAction] ...
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Register</h1>
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
        <Input
          type="password"
          name="confirmPassword"
          required
          className="mb-4"
          placeholder="Confirm Password"
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
  return <Button type="submit">Register</Button>
}
