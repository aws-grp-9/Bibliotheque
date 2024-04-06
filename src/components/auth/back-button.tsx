"use client";
import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';

interface BackButtonProps {
    backButtonHref:string;
    backButtonLabel:string;
}

export default function BackButton({backButtonHref, backButtonLabel}:BackButtonProps) {
  return (
    <Button variant={"link"} className='w-full font-normal' size={"sm"} asChild>
        <Link href={backButtonHref}>
            {backButtonLabel}
        </Link>
    </Button>
  )
}
