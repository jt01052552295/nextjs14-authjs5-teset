import { auth } from './auth'
import { NextResponse } from 'next/server'

export async function middleware() {
  const session = await auth()
  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
  }
}

// See "Matching Paths" below to learn more
// middleware() 에 적용되는 목록
export const config = {
  matcher: ['/profile'],
}
