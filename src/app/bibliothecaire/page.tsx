'use client';
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FaBook, FaNewspaper, FaUsers, FaBan, FaBell, FaCalendarAlt, FaComments, FaPlus } from 'react-icons/fa';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const checkAdmin = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error || !data) {
                throw new Error('User data not available');
            }
            const headers1 = new Headers();
            headers1.append('Content-Type', 'application/json');
            headers1.append('user_token', JSON.stringify(data));
            const response1 = await fetch(`${API_URL}/api/user/personnal`,{
                method: 'GET',
                headers: headers1,
            });
            const query_data1 = await response1.json();
            if (response1.status !== 200 || !query_data1.result || !query_data1.result.admin) {
                throw new Error('User is not an admin or API request failed');
            }
        } catch (error) {
            console.error('Error while checking admin:', error);
            router.push('/');
        }
    }

    React.useEffect(() => {
        checkAdmin();
    }, []);


    return (
        <section className="max-w-7xl mx-auto mb-5 my-5 bg-blue-100 px-4" style={{backgroundImage: `url("/biblio3.jpg")`}}>
            <h2 className="text-4xl font-bold mb-5 my-5 text-center ">L'équipe bibliothécaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-blue-100 p-6 rounded-md" style={{backgroundImage: `url("/biblio3.jpg")`}}>
                <Link href="/bibliothecaire/ajouterlivre">
                    <Button variant="sky" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaBook className="text-7xl" />
                        <span>Ajouter un livre</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/ajouteractualite">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-10 text-center">
                        <FaNewspaper className="text-7xl" />
                        <span>Ajouter une actualité</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/gererprets">
                    <Button variant="sky" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaUsers className="text-7xl" />
                        <span>Gérer les prêts</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/bannirutilisateur">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaBan className="text-7xl" />
                        <span>Bannir des utilisateurs</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/notifications">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaBell className="text-7xl" />
                        <span>Notifications</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/calendrier">
                    <Button variant="sky" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaCalendarAlt className="text-7xl" />
                        <span>Calendrier</span>
                    </Button>
                </Link>
                <Link href="/commentaires">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaComments className="text-7xl" />
                        <span>Commentaires</span>
                    </Button>
                </Link>
                <Link href="/bibliothecaire/ajouterarticle">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaPlus className="text-7xl" />
                        <span>Ajouter un article</span>
                    </Button>
                </Link>
            </div>
        </section>
    );
};

const HomeBibliothecairePage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-blue-100 min-h-screen" style={{backgroundImage: `url("/biblio3.jpg")`}}>
                <AdminDashboard />
            </main>
            <Footer />
        </>
    );
};

export default HomeBibliothecairePage;
