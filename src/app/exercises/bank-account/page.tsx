import {BankStatement} from '@/components/bank-statement'

import {Label} from '@/components/ui/label'
import {getConnectedUser} from '../auth/lib/dal'

async function Page() {
  const user = await getConnectedUser()
  return (
    <div>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Label>Your Account : {user?.email}</Label>
      </div>
      <BankStatement />
    </div>
  )
}
export default Page
