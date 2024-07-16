'use client'
import {signIn} from '@/auth'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useFormState as useActionState, useFormStatus} from 'react-dom'
import {authenticate} from '../auth/actions'

export function SignInCredential() {
  const [actionState, authenticateAction] = useActionState(authenticate, {})
  return (
    <form action={authenticateAction}>
      <Label>
        Email
        <Input className="mb-4" name="email" type="email" />
      </Label>
      <Label>
        Password
        <Input className="mb-4" name="password" type="password" />
      </Label>
      <LoginButton />
      <div className="text-red-500">
        {actionState?.message && <p>{actionState.message}</p>}
      </div>
    </form>
  )
}

function LoginButton() {
  const {pending} = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      Sign In
    </Button>
  )
}
