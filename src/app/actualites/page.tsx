'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { createClient } from '@/utils/supabase/client';
import { FaCalendarAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Importation de l'icône de calendrier
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

// Interface pour représenter une actualité
interface Actualite {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string; // Champ d'image ajouté
    category: string; // Ajout de la catégorie
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

    // Fonctions de partage social
    const shareOnFacebook = (title: string, description: string) => {
        // Implémentez la logique de partage sur Facebook
    };

    const shareOnTwitter = (title: string) => {
        // Implémentez la logique de partage sur Twitter
    };

    const shareOnLinkedIn = (title: string, description: string) => {
        // Implémentez la logique de partage sur LinkedIn
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto py-8">
                    <h2 className="text-5xl text-blue-500 textalign-center font-semibold mb-6">Actualités</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actualites.map(actualite => (
                            <div key={actualite.id} className="bg-white p-6 rounded-lg shadow-lg actualite-card">
                                {/* Section de l'image */}
                                <div className="mb-4">
                                    <img src={actualite.image} alt={actualite.title} className="w-full h-auto rounded-lg" />
                                </div>
                                {/* Section de la date */}
                                <div className="flex items-center mb-2 text-green-500">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{actualite.date}</span>
                                </div>
                                {/* Section du titre */}
                                <h3 className="text-lg font-semibold text-blue-500 mb-2">{actualite.title}</h3>
                                {/* Section de la catégorie */}
                                <p className="text-gray-700 mb-2">{actualite.category}</p>
                                {/* Section de la description */}
                                <p className="text-gray-700 mb-4">{actualite.description}</p>
                                {/* Boutons de partage social */}
                                <div className="flex justify-center space-x-4 mb-4">
                                    <FaFacebook className="text-blue-500 cursor-pointer" onClick={() => shareOnFacebook(actualite.title, actualite.description)} />
                                    <FaTwitter className="text-blue-500 cursor-pointer" onClick={() => shareOnTwitter(actualite.title)} />
                                    <FaLinkedin className="text-blue-500 cursor-pointer" onClick={() => shareOnLinkedIn(actualite.title, actualite.description)} />
                                </div>
                                {/* Lien vers l'article complet */}
                                <a href={`/actualites/${actualite.id}`} className="text-blue-500 hover:underline">Lire la suite</a>
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

