'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const { data: me } = useSession()
  const router = useRouter()

  const onLogout = () => {
    console.log(me) // 세션정보 확인가능함.
    signOut({ redirect: false }).then(() => {
      router.replace('/auth/login')
    })
  }

  return <button onClick={onLogout}>Sign out</button>
}

export default Logout
