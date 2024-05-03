"use client"

import { Button } from "@/components/ui/button"


export default function SocialButtons() {
  return (
    <div className="flex gap-x-3 w-full items-center">
        <Button variant={"danger"} className="w-full"  onClick={()=>{}}>
            Connectez vous avec Google
        </Button>
    </div>
  )
}