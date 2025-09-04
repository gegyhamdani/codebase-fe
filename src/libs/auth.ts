import CredentialProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

import { login } from '@/services/auth.service'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string }

        try {
          const response = await login(username, password)

          if (!response) {
            return null
          }

          return {
            id: response.data.userId,
            token: response.data.token,
            profile: {
              userId: response.data.userId,
              username: response.data.username,
              email: response.data.email
            }
          }
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token
      }

      return session
    }
  }
}
