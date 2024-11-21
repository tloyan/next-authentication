'use client'
import {useFormStatus} from 'react-dom'
import {useActionState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

import {register} from '@/app/exercises/auth/actions'
export default function RegisterForm() {
  const [actionState, registerAction] = useActionState(register, {})
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Register</h1>
      <form action={registerAction}>
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
        <Input
          type="password"
          name="confirmPassword"
          required
          className="mb-4"
          placeholder="Confirm Password"
        />
        <p className="text-sm text-red-500">
          {actionState?.errors?.confirmPassword}
        </p>
        <RegisterButton />
        <p className="text-sm text-red-500">{actionState?.message}</p>
      </form>
    </div>
  )
}
function RegisterButton() {
  const {pending} = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      Register
    </Button>
  )
}
