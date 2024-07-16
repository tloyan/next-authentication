import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'

import {getUserByEmail} from './db/sgbg-unstorage'
import {verifyPassword} from './app/exercises/auth/lib/crypt'
import {UnstorageAdapter} from '@auth/unstorage-adapter'
import storage from './db/unstorage-store'

console.log('process.env.NEXT_RUNTIME AUTH', process.env.NEXT_RUNTIME)

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Google,
    Resend,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email as string)
        const passwordMatch = verifyPassword(
          user?.password as string,
          credentials.password as string
        )
        console.log('authorize user', user)

        if (!user) {
          throw new Error('User not found.')
        }
        if (!passwordMatch) {
          throw new Error('Password incorrect.')
        }
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
