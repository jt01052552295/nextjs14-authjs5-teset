import bcrypt from 'bcryptjs'
import { CredentialsSignin } from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { getUserByEmail } from '@/data/user'
import { Auth } from '@auth/core'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
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
} satisfies NextAuthConfig
