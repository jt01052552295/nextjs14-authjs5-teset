'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@/app/_component/user-button'

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Link href="/server" className={pathname === '/server' ? 'default' : 'outline'}>
          Server
        </Link>

        <Link href="/client" className={pathname === '/client' ? 'default' : 'outline'}>
          Client
        </Link>

        <Link href="/admin" className={pathname === '/admin' ? 'default' : 'outline'}>
          Admin
        </Link>

        <Link href="/settings" className={pathname === '/settings' ? 'default' : 'outline'}>
          Settings
        </Link>
      </div>
      <UserButton />
    </nav>
  )
}
