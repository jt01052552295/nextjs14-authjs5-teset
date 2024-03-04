import React from 'react'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import Logout from '../_component/Logout'

const ProfilePage = async () => {
  // const { user }: any = await auth()
  // console.log('ProfilePage', user)
  return (
    <div>
      ProfilePage{' '}
      <div className="ml-auto flex items-center gap-x-2">
        <Logout />
      </div>
    </div>
  )
}

export default ProfilePage
