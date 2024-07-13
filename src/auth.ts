//import {unstorageGetUser} from '@/db/unstorage'
import NextAuth from 'next-auth'
import type {NextAuthConfig} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import {UnstorageAdapter} from '@auth/unstorage-adapter'
import {createStorage} from 'unstorage'
//import fsDriver from 'unstorage/drivers/fs'
import memoryDriver from 'unstorage/drivers/memory'
import {getUserByEmail} from './db/sgbg-unstorage'
import {verifyPassword} from './app/exercises/auth/lib/crypt'

const storage = createStorage({
  driver: memoryDriver(),
  //driver: fsDriver({base: './tmp'}),
})

export const {handlers, signIn, signOut, auth} = NextAuth({
  // pages: {
  //   signIn: '/exercises/login',
  // },
  // callbacks: {
  //   session: async ({session, token}) => {
  //     console.log('callbacks session', session)
  //     console.log('callbacks token', token)
  //     //session.user.id = token.sub
  //     return session
  //   },
  // },
  providers: [
    Google,
    Resend,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const user = await getUserByEmail(credentials.email as string)
        console.log('authorize user', user)
        const passwordMatch = verifyPassword(
          user?.password as string,
          credentials.password as string
        )
        // const passwordMatch = await bcrypt.compare(
        //   credentials.password as string,
        //   user?.password ?? ''
        // )

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.')
        }
        if (!passwordMatch) {
          // Passwords don't match
          throw new Error('Password incorrect.')
        }

        // return user object with the their profile data
        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString('hex')
    // },
  },
  adapter: UnstorageAdapter(storage),
} satisfies NextAuthConfig)

// hack for node fs in middleware

// const getUserByEmail = async (email: string) => {
//   return {
//     id: '1',
//     email,
//     password: '$2b$10$ctVHPcQ6RdTSIYnxUVbj6uzjbe9P1Cmku.vcon9uLj4I/xYpXGwvO',
//     name: 'John',
//     role: 'USER',
//   }
// }
