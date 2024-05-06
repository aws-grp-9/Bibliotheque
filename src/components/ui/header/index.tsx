"use client";
import {AlignJustify, DoorClosed, SunMedium, Moon, Plus, BookOpen, BellPlus, MessageCircle, LayoutDashboard, User, Settings, DoorOpen} from "lucide-react";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTrigger, SheetTitle} from "@/components/ui/sheet";
import {DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTheme} from "next-themes";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import { signOut } from "@/actions/auth";
import { useRouter } from 'next/navigation';

const navlinks = [
    {
        id:1,
        title:"Accueil",
        href: "/",
    },
    {
        id:2,
        title:"Livres",
        href:"/book"
    },
    {
        id:3,
        title:"Articles",
        href:"/articles"
    },
    {
        id:4,
        title:"Actualités",
        href:"/actualites"
    },
    {
        id:5,
        title:"Nous contacter",
        href:"/dashboard/newforum"
    },
];
const morelinks = [
    {
        id:1,
        title:"Nouveau livre",
        href: "/dashboard/newdocument",
    },
    {
        id:2,
        title:"Nouvel article",
        href:"/dashboard/newarticle"
    },
    {
        id:3,
        title:"Nous contacter",
        href:"/dashboard/newforum"
    },
    {
        id:4,
        title:"Profil",
        href:"/dashboard/profile"
    },
    {
        id:5,
        title:"Ma liste de prets",
        href:"/dashboard/mesprets"
    },
];

//export default Chat;

export default function Navbar(){
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [ email,setEmail ] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        console.log('Recherche en cours pour :', searchQuery);
    };

    const checksession = async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
            return;
        }
        document.getElementById('Disconnected')?.classList.add('hidden');
        document.getElementById('Connected')?.classList.remove('hidden');
        setEmail(data.user.email || ''); // Provide a default value for setEmail to make TypeScript happy..
    }

    React.useEffect(() => {
        checksession()
    }, []);


    return(
        <>
            <nav className="z-[30] w-full sticky top-0 backdrop-blur-sm bg-white/90 dark:bg-slate-950/90 transition">
                <section className="max-w-[1340px] mx-auto px-2">
                    <section className="flex items-center justify-between h-[65px]">
                        <section className="flex items-center gap-5">
                            <Link href="/"
                                  className="mx-2 flex items-center gap-0 text-lg md:text-xl lg:text-2xl font-serif">
                                BIBLIOTHEQUE UNIVERSITAIRE
                            </Link>
                            <div className="items-center hidden md:flex">
                                {navlinks.map((nlink) => (
                                    <Link
                                        key={nlink.id}
                                        href={nlink.href}
                                        className={clsx(pathname == nlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}
                                    >
                                        {nlink.title}
                                    </Link>
                                ))}
                            </div>
                        </section>
                        

                        <section className="flex items-center gap-3">
                            <Button size={"icon"} className="relative rounded-full" variant="ghost" onClick={() => {
                                setTheme(theme === "light" ? "dark" : "light")
                            }}>
                                <SunMedium 
                                className="dark:scale-0 scale-100 rotate-45 transition-all dark:rotate-0"
                                size={20}/>
                                <Moon 
                                className="absolute dark:scale-100 scale-0 rotate-45 transition-all dark:rotate-0"
                                size={20}/>
                            </Button>
                            <div className="hidden md:flex gap-2">
                                <div
                                    className={`text-sm flex gap-3 items-center font-medium ${/* user ? "hidden": */"flex"}`} id="Disconnected">
                                    <Link href={"/auth/login"} className="text-green-600 hover:text-green-600/90 flex">Se
                                        connecter</Link>
                                    ●
                                    <Link href={"/auth/register"} className="hover:text-opacity-90">S{"'"}inscrire</Link>
                                </div>
                                <div className={`flex gap-4 ${/* user ? "flex" : */ "hidden"}`} id="Connected">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="px-2 py-2 rounded-full">
                                                <Plus/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent aria-label="Static Actions"
                                                             className="rounded-md mr-3 w-[200px]">
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/bibliothecaire/ajouterlivre"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <BookOpen size={20}/>
                                                    Nouveau livre
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/bibliothecaire/ajouterarticle"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <BellPlus size={20}/>
                                                    Nouvel article
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/newforum"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <MessageCircle size={20}/>
                                                    Nous contacter
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/profile"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <User size={20}/>
                                                    Profil
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem asChild className="rounded-md">
                                                <Link href="/dashboard/mesprets"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <BookOpen size={20}/>
                                                    Mes prets
                                                </Link>
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuContent aria-label="Static Actions"
                                                             className="mr-3 rounded-md w-[200px]">
                                            <DropdownMenuLabel className="text-xs line-clamp-2" id="loggedInAs">Connecté en tant
                                                que <br/> { email }</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem className="rounded-md" asChild>
                                                <Link href="/dashboard"
                                                      className="flex gap-2 items-center w-full h-full py-2 cursor-pointer">
                                                    <LayoutDashboard size={20}/>
                                                    Tableau de bord
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="rounded-md text-red-600 hover:text-red-600 flex gap-2 items-center w-full h-full" onClick={() => {signOut().then(() => location.reload())}}>
                                                <DoorOpen size={20}/>
                                                Se déconnecter
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </section>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="ghost" className="flex md:hidden">
                                    <AlignJustify/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>BIBLIOTHEQUE UNIVERSITAIRE</SheetTitle>
                                    <SheetDescription>Votre bibliothèque numérique</SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-3 mt-4">
                                    {navlinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                </div>
                                <div className={`flex-col mt-4 gap-3 ${/* user ? "flex" :  */"hidden"}`}>
                                    {morelinks.map((navlink, index) => (
                                        <div key={index}>
                                            <SheetClose asChild>
                                                <Link
                                                    href={navlink.href}
                                                    className={clsx(pathname == navlink.href ? "text-green-600" : "text-gray-600 dark:text-neutral-50", "font-medium hover:text-green-600 dark:hover:text-green-600 px-4 py-1 text-sm")}>
                                                    {navlink.title}
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    ))}
                                    <SheetClose>
                                        <button
                                            className="font-medium text-red-600 hover:text-red-400 w-full py-3 text-sm flex justify-start gap-2">
                                            <DoorClosed size={20}/>
                                            Se déconnecter
                                        </button>
                                    </SheetClose>
                                </div>

         
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="Recherche..."
                                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                        onClick={handleSearch}
                                    >
                                        Rechercher
                                    </button>
                                </div>
                                <div
                                    className={`text-sm flex-col gap-3 font-medium ml-4 mt-3 ${/* user ? "hidden" : */ "flex"}`}>
                                    <SheetClose asChild>
                                        <Link href={"/signin"} className="text-green-600 hover:text-green-600/90 flex">
                                            Se connecter
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href={"/signup"} className="hover:text-opacity-90">
                                            S{"'"}inscrire
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </section>
                </section>
            </nav>
        </>
    )
}