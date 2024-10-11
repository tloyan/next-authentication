/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'

// 🐶 Importe les providers `Google` et `Resend`
// 🤖 import Google from 'next-auth/providers/google'
// 🤖 import Resend from 'next-auth/providers/resend'
import Credentials from 'next-auth/providers/credentials'

// 🐶 Importe `getUserByEmail` et `verifyPassword`
//import {getUserByEmail} from './db/sgbg-unstorage'
//import {verifyPassword} from './app/exercises/auth/lib/crypt'
import {UnstorageAdapter} from '@auth/unstorage-adapter'
import storage from './db/unstorage-store'

console.log('process.env.NEXT_RUNTIME AUTH', process.env.NEXT_RUNTIME)

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    // 🐶 Ajoute les providers `Google` et `Resend` en plus de `Credentials`
    // Google,
    // Resend,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        // 🐶 Utilise `getUserByEmail` pour récupérer le user en BDD
        const user = {}

        // 🐶 Utilise `verifyPassword` pour vérifier le mot de passe
        // 🤖
        // const passwordMatch = verifyPassword(
        //   user?.password as string,
        //   credentials.password as string
        // )

        // 🐶 Lève une error `User not found.` si le user n'existe pas
        // 🐶 Lève une error `Password incorrect.` si le mot de passe est incorrect

        // 🐶 Retoure le `user`
        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  adapter: UnstorageAdapter(storage),
} satisfies NextAuthConfig)
