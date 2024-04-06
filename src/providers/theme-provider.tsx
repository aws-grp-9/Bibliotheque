"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function NextThemesProvider({children, ...props}:ThemeProviderProps){
    return(
        <ThemeProvider {...props}>
            <ProgressBar
                options={{ showSpinner: true }}
                height="4px"
                color="#be123c"
            />
            {children}
        </ThemeProvider>
    )
}