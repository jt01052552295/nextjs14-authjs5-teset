import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // const { user }: any = await auth()

    // if (!user) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    const user = { id: 'john_doe', name: 'jtm', email: 'test@test.com', param: params.id }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
