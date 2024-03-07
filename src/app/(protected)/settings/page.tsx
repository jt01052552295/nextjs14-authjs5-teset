import React from 'react'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import Logout from '@/app/_component/Logout'

const SettingsPage = async () => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <div className="ml-auto flex items-center gap-x-2">
        <Logout />
      </div>
    </div>
  )
}

export default SettingsPage
