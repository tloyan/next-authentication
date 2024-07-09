// 🐶 Importe les 2 composants ci-dessous ils seronts utile pour le formulaire de login
// 🤖
// import {Button} from '@/components/ui/button'
// import {Input} from '@/components/ui/input'

function Page() {
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {/* 🐶 va dans le composant <LoginForm> pour le creer le formulaire */}
      <LoginForm></LoginForm>
    </div>
  )
}

function LoginForm() {
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
      <form>
        {/* 🐶 Creer les 2 champs input email et password */}
        {/* <Input
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
        /> */}

        {/* 🐶 Dans  <LoginButton /> creer le bouton */}
        <LoginButton />
      </form>
    </div>
  )
}
function LoginButton() {
  return <></>
}

export default Page
