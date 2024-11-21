'use client'
import {Button} from '@/components/ui/button'
import {logout} from '../actions'
import {useState} from 'react'

export default function Logout() {
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Déconnexion</h1>
      <LogoutButton />
    </div>
  )
}
function LogoutButton() {
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    setPending(true)
    await logout()
    setPending(false)
  }

  return (
    <Button onClick={handleClick} disabled={pending}>
      Logout
    </Button>
  )
}
