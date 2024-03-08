'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from '@/app/_component/logout-button'

export const UserButton = () => {
  const user = useCurrentUser()

  return <LogoutButton>Logout</LogoutButton>
}
