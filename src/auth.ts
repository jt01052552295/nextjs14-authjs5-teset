import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'
import { getUserById, getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

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
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        console.log('credentials - signin', user)
      }

      const existingUser = await getUserById(user.id ?? '')
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (account?.provider === 'google') {
        console.log('google - signin', user)
        // return profile?.email_verified && profile?.email?.endsWith('@gmail.com')
      }
      if (account?.provider === 'github') {
        console.log('github - signin', user)
        // return profile?.email_verified && profile?.email?.endsWith('@gmail.com')
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    session({ session, token, user }) {
      // session.user = token.user as User
      //   console.log('auth.ts session', session)
      return session
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials

        const user = await getUserByEmail(email as string)
        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(password as string, user.password)

        if (passwordsMatch) return user

        return null
      },
    }),
  ],
})
