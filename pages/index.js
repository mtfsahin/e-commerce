
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  if(!session){
    
  }
    return(
      <Layout>
        <div className="flex text-blue-900 justify-between">
          <h2>
            Hello, <b>{session?.user?.name}</b>
          </h2>
          <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
            <img src={session?.user?.image} className="w-6 h-6"/>
            {session?.user?.name}
          </div>
        </div>
      </Layout>
    );
}