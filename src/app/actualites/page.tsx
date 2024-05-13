'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { createClient } from '@/utils/supabase/client';
import { FaCalendarAlt, FaFacebook, FaTwitter, FaLinkedin, FaNewspaper, FaBriefcase, FaStar } from 'react-icons/fa';

// Interface pour représenter une actualité
interface Actualite {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
}

const ActualitesPage = () => {
    const [actualites, setActualites] = useState<Actualite[]>([]);
    const supabase = createClient();

    // Fonction pour récupérer les actualités depuis Supabase
    const fetchActualites = async () => {
        try {
            const { data: actualitesData, error } = await supabase.from('news').select('*');
            if (error instanceof Error) {
                console.error('Error fetching actualites:', error.message);
            } else {
                setActualites(actualitesData as Actualite[]);
            }
        } catch (error) {
            console.error('Error fetching actualites:', error);
        }
    };
    
    useEffect(() => {
        fetchActualites();
    }, []);

    const shareOnFacebook = (title: string, description: string) => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareOnTwitter = (title: string) => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
    };

    const shareOnLinkedIn = (title: string, description: string) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${title}\n${description}`);
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, '_blank');
    };

    return (
        <>
            <Navbar />
            <main className="bg-gradient-to-b from-blue-200 to-blue-300 min-h-screen">
                <div className="container mx-auto py-8">
                    <h2 className="text-5xl text-center text-green-700 font-bold mb-10">Dernières Actualités</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-green-50 gap-8" style={{backgroundImage: `url("/biblio3.jpg")`}}>
                        {actualites.map(actualite => (
                            <div key={actualite.id} className="rounded-lg font-bold shadow-lg overflow-hidden transition duration-800 transform hover:scale-105">
                                <div className="flex justify-center items-center h-20">
                                {actualite.category === 'Education' && <FaNewspaper className="text-8xl text-green-500" />}
                                {actualite.category === 'Evènements' && <FaBriefcase className="text-8xl text-green-500" />}
                                {actualite.category === 'entertainment' && <FaStar className="text-20xl text-green-500" />}

                                    {/* Ajoutez d'autres conditions pour d'autres catégories si nécessaire */}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-green-500 mb-2">
                                        <FaCalendarAlt className="mr-6" />
                                        <span>{actualite.date}</span>
                                    </div>
                                    <h3 className="text-3xl font-semibold text-green-700 mb-2">{actualite.title}</h3>
                                    <p className="text-gray-600 mb-4">{actualite.description}</p>
                                    <div className="flex justify-center space-x-4">
                                        <FaFacebook className="text-blue-500 cursor-pointer" onClick={() => shareOnFacebook(actualite.title, actualite.description)} />
                                        <FaTwitter className="text-blue-500 cursor-pointer" onClick={() => shareOnTwitter(actualite.title)} />
                                        <FaLinkedin className="text-blue-500 cursor-pointer" onClick={() => shareOnLinkedIn(actualite.title, actualite.description)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ActualitesPage;
