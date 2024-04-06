import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BIBLIOTHEQUE UNIVERSITAIRE",
    description: "Accéder à votre compte ou créer en un.",
    applicationName: "BIBLIOTHEQUE UNIVERSITAIRE",
    creator: "Luce,Yenal, Sabine and Nabil",
    authors: [{
      name: "Luce,Yenal, Sabine and Nabil",
      url: "",
    }],
  }

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 dark:from-slate-500 dark:via-slate-700/50 dark:to-slate-900/50 via-slate-200/50 to-slate-500/50">
        {children}
      </div>
    );
  }