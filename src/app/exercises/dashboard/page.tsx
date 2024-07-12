//1. 🚀 Protéger les routes dashbaord et bank-account
import {DashBoard} from '@/components/dash-board'
import withAuth from '../auth/lib/withAuth'

function Page() {
  return <DashBoard />
}
export default withAuth(Page)
