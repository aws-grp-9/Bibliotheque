import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FaBook, FaNewspaper, FaUsers, FaBan, FaChartPie, FaBell, FaCalendarAlt, FaComments } from 'react-icons/fa'; // Importation des icônes

const AdminDashboard = () => {
    // Contenu du tableau de bord de l'administrateur
    return (
        <section className="max-w-7xl mx-auto mb-5 my-5 bg-blue-100 px-4">
            {/* Contenu du tableau de bord */}
            <h2 className="text-4xl font-bold mb-5 my-5 text-center text-blue-700 ">L'équipe bibliothécaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-blue-100 p-6 rounded-md">
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
                <Link href="/statistiques">
                    <Button variant="sky" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaChartPie className="text-7xl" />
                        <span>Statistiques</span>
                    </Button>
                </Link>
                <Link href="/notifications">
                    <Button variant="success" size="lg" className="flex items-center justify-center space-x-2 py-10 px-14 text-center">
                        <FaBell className="text-7xl" />
                        <span>Notifications</span>
                    </Button>
                </Link>
                <Link href="/calendrier">
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
            </div>
        </section>
    );
};

const HomeBibliothecairePage = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            
            {/* Contenu de la page */}
            <main className="bg-blue-100 min-h-screen">
                {/* Section du tableau de bord */}
                <AdminDashboard />
                
                {/* Autres sections de la page */}
            </main>
            
            {/* Footer */}
            <Footer />
        </>
    );
};

export default HomeBibliothecairePage;