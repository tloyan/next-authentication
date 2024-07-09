'use client'
import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import {logout} from '@/app/exercises/auth/actions'
import {UserDTO} from '@/app/exercises/auth/lib/type'
import {useRouter} from 'next/navigation'

export default function Logout({user}: {user?: UserDTO}) {
  console.log('Logout', user)
  return (
    <div className="">
      <h1 className="mb-4 text-center text-3xl font-bold">Déconnexion</h1>
      <LogoutButton />
    </div>
  )
}
function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Logout')
    setPending(true)
    await logout()
    setPending(false)
    router.push('/exercises/')
  }

  return (
    <Button type="submit" onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}
