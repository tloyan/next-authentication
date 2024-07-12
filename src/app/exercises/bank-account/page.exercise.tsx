//1. 🚀 Protéger les routes dashbaord et bank-account
import {BankStatement} from '@/components/bank-statement'

//🐶 utilise le HOC withAuth
function Page() {
  // 🐶 Avec le HOC tu as accèes au 'user'
  // affiche l'email de l'utilisateur

  // <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
  //   <Label>Your Account : {user.email}</Label>
  // </div>
  return (
    <div>
      <BankStatement />
    </div>
  )
}
export default Page
