import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // const { id } = await request.json()
    // console.log('api', id)

    const res = { id: 'john_doe', name: 'jtm', email: 'test@test.com' }

    return NextResponse.json({ user: res }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
