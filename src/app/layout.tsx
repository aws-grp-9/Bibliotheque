import type { Metadata } from "next";
import { Inter, DM_Sans, Space_Grotesk } from "next/font/google";
import Providers from "@/providers";
import "./globals.css";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BIBLIOTHEQUE UNIVERSITAIRE",
  description: "Application pour numériser notre bibliotheque universitaire.",
  applicationName: "BIBLIOTHEQUE UNIVERSITAIRE",
  keywords: ["Etudiants de l'UVSQ","UVSQ", "AWS", "BIBLIOTHEQUE UNIVERSITAIRE","UNIVERSITE DE VERSAILLES SAINT QUENTIN"],
  creator: "Luce,Yenal, Sabine and Nabil",
  authors: [{
    name: "Luce,Yenal, Sabine and Nabil",
    url: "",
  }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${space_grotesk.className} min-h-screen antialiased bg-white dark:bg-slate-950`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
