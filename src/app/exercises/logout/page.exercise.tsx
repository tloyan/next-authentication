// 🐶 Importe le composant ci-dessous il sera utile pour le `logout`
// 🤖
//import {Button} from '@/components/ui/button'

function Page() {
  return (
    <div className="mx-auto flex max-w-2xl justify-center p-6 text-lg">
      {/* 🐶 Edite `<Logout />` pour ajouter un button */}
      <Logout />
    </div>
  )
}

function Logout() {
  return (
    <div className="">
      <h1 className="mb-4 text-center text-3xl font-bold">Déconnexion</h1>
      {/* 🐶 Edite `<Logout />` pour ajouter un `button` */}
      {/* <Button type="submit">Logout</Button> */}
    </div>
  )
}

export default Page
