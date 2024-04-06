import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

export default async function Dashboard() {
    const user = await auth()
  return (
    <div>
      {JSON.stringify(user)}
      <form action={async()=>{
        "use server"
        await signOut();
      }}>
        <Button>Se déconnecter</Button>
      </form>
    </div>
  )
}
