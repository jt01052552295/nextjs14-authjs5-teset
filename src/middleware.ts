import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest) {
  // console.log('ROUTE:' + request.nextUrl.pathname)
  const session = await auth()
  // console.log('IS LOGGED IN', session)

  const pathName = request.nextUrl.pathname

  const isApiAuthRoute = pathName.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathName)
  const isAuthRoute = authRoutes.includes(pathName)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (session) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl))
    }
    return null
  }

  if (!session && !isPublicRoute) {
    let callbackUrl = pathName
    if (request.nextUrl.search) {
      callbackUrl += request.nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.nextUrl))
  }

  return null

  // if (!session) {
  //   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)
  // }
}

// See "Matching Paths" below to learn more
// middleware() 에 적용되는 목록
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
