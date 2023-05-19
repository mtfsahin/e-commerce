
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className='flex items-center bg-blue-800 w-screen h-screen'>
        <div className='text-center w-full'>
          <button     onClick={() => signIn('google')} className='bg-white text-black p-2 rounded-sm px-4'>Google Login</button>
        </div>
      </div>
    )
  }

  return(
    <div>
      Logged in {session.user.email}
    </div>
  )
}
