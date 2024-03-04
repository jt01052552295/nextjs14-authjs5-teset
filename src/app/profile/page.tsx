import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const session = await auth()
  if (session?.user) {
    redirect('/login')
    return null
  }
  return <div>ProfilePage</div>
}

export default ProfilePage
