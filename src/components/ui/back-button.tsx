"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton(){
    const router = useRouter();
    return(
        <div className="hidden sm:flex" title="Retour à la page précédente">
            <Button
                variant="link"
                className="absolute top-[60px] left-[60px] rounded-full py-5 px-5 gap-2 flex"
                onClick={() => router.back()}
            >
                <ArrowLeft size={20}/>
                <span className="text-sm">Retour</span>
            </Button>
        </div>
    )
}