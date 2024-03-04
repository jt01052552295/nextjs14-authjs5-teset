import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // const { id } = await request.json()
    // console.log('api', id)

    const res = { id: 'john_doe', name: 'jtm', email: 'test@test.com' }

    // console.log('api', row[0])
    return NextResponse.json(res)
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    )
  }
}
