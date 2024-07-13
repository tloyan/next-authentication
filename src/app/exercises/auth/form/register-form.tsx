'use server'

import {register} from '@/app/exercises/auth/actions-auth'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

export default async function RegisterForm() {
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Register</h1>
      <form
        action={async (formData) => {
          'use server'
          await register({}, formData)
        }}
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4"
        />

        <Input
          type="password"
          name="confirmPassword"
          required
          className="mb-4"
          placeholder="Confirm Password"
        />

        <LoginButton />
        <div className="text-red-500"></div>
      </form>
    </div>
  )
}
function LoginButton() {
  return <Button type="submit">Register</Button>
}
