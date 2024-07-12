//1. 🚀 Protéger les routes dashbaord et bank-account
import {BankStatement} from '@/components/bank-statement'
import withAuth from '../auth/lib/withAuth'
import {UserDTO} from '../auth/lib/type'
import {Label} from '@/components/ui/label'

function Page({user}: {user: UserDTO}) {
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Label>Your Account : {user.email}</Label>
      </div>
      <BankStatement />
    </div>
  )
}
export default withAuth(Page)
