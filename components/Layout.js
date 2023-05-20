
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"

export default function Layout({ children }) {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div className='flex items-center bg-blue-800 w-screen h-screen'>
                <div className='text-center w-full'>
                    <button onClick={() => signIn('google')} className='bg-white p-2 rounded-sm px-4'>Google Login</button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex bg-blue-900 min-h-screen">
            <Nav />
            <div className="bg-white flex-grow p-4 mt-2 mb-2 mr-2 rounded-lg">
                {children}
            </div>
        </div>
    )
}
