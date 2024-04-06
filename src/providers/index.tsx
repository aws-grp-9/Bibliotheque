import React from "react";
import NextThemesProvider from "./theme-provider";
import { Toaster } from "sonner";

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <NextThemesProvider enableSystem defaultTheme="system" attribute="class">
            <Toaster />
            {children}
        </NextThemesProvider>
    )
}