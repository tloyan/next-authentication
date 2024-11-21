'use client'
import {useFormStatus} from 'react-dom'
import {useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

import {authenticate} from '@/app/exercises/auth/actions'
export default function LoginForm() {
  const [actionState, authenticateAction] = useActionState(authenticate, {})
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
      <form action={authenticateAction}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4"
        />
        <p className="text-sm text-red-500">{actionState?.errors?.email}</p>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4"
        />
        <p className="text-sm text-red-500">{actionState?.errors?.password}</p>
        <LoginButton />
        <p className="text-sm text-red-500">{actionState?.message}</p>
      </form>
    </div>
  )
}
function LoginButton() {
  const {pending} = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      Login
    </Button>
  )
}
