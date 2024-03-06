import Link from 'next/link'

export const ErrorCard = () => {
  return (
    <div>
      <div className="w-full flex justify-center items-center">Oops! Something went wrong!</div>
      <Link href="/auth/login"></Link>
    </div>
  )
}
