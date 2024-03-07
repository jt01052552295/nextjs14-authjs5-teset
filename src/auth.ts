import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { UserRole } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'
import { getAccountByUserId } from '@/data/account'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // 로그인, 회원가입 url을 등록함.
    signIn: '/auth/login',
    newUser: '/auth/signup',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      console.log('linkAccount', user)
      const verified = dayjs(new Date().getTime()).add(9, 'hour').format()
      console.log('linkAccount', verified)
      // await db.user.update({
      //   where: { id: user.id },
      //   data: { emailVerified: verified }
      // })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log(account?.provider)
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id ?? '')
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      console.log('jwt', token)
      // token.customField = 'test'
      return token
    },
    async session({ token, session }) {
      // session.user = token.user as User
      //   console.log('auth.ts session', session)

      if (session.user && token.sub) {
        session.user.id = token.sub
        // session.user.customField = 'anything'
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }

      console.log('session - token', token)
      console.log('session - session', session)
      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
