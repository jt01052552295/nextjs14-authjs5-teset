'use client'
import { admin } from '@/actions/admin'
import { FormSuccess } from '@/app/_component/message/form-success'
import { UserRole } from '@prisma/client'
import { RoleGate } from '@/app/_component/role-gate'

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        console.error(data.error)
      }
      if (data.success) {
        console.log(data.success)
      }
    })
  }

  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        console.log('Allowed API Route!')
      } else {
        console.error('Forbidden API Route!')
      }
    })
  }

  return (
    <div className="w-[600px]">
      <div>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </div>
      <div className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <button onClick={onApiRouteClick}>Click to test</button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <button onClick={onServerActionClick}>Click to test</button>
        </div>
      </div>
    </div>
  )
}
export default AdminPage
