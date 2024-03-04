import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    // 로그인, 회원가입 url을 등록함.
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log('user', user)
        // NextAuth 에서 user 타입이 id, name, email, image 고정되있어서 아래처럼 해줘야됨.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          ...user,
        }
      },
    }),
  ],
})
