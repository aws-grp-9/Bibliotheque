
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';

// Définir une interface pour les données du livre
interface Livre {
  id: number;
  title: string;
  author: string;
  summary: string; // Résumé du livre
  image: string; // URL de l'image du livre
  available: boolean; // Ajout de l'attribut disponible
}

const LivrePage = () => {
  // Supposons que nous avons un livre fictif
  const [livre, setLivre] = useState<Livre>({
    id: 1,
    title: "Le Guide du Voyageur Galactique",
    author: "Douglas Adams",
    summary: "Un résumé du livre...",
    image: " /informatique.jpg",
    available: true, // Livre initialement disponible
  });

  // Fonction pour gérer la réservation du livre et enregistrer la date
  const handleReservation = () => {
    const dateReservation = new Date().toLocaleDateString(); // Obtenir la date actuelle
    alert(`Vous avez réservé le livre le ${dateReservation} !`);
    // Mettre à jour le statut du livre comme non disponible
    setLivre((prevLivre) => ({
      ...prevLivre,
      available: false,
    }));
   
  };

  return (
    <div className="bg-blanc-100 min-h-screen py-10 px-4">
      <Navbar />
      <div className="container mx-auto mt-10 flex justify-center items-center">
        <div className="max-w-3/4 flex justify-between items-center">
          {/* Section du contenu textuel */}
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-6 text-center">{livre.title}</h1>
            <p className="font-bold mb-4">Auteur: {livre.author}</p>
            {/* Condition pour afficher le bouton de réservation ou le message */}
            {livre.available ? (
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                onClick={handleReservation}
              >
                Réserver ce livre
              </button>
            ) : (
              <p className="text-red-500 font-bold mb-4">Ce livre a été réservé</p>
            )}
          </div>
          {/* Section de l'image du livre */}
          <div className="w-1/3 relative">
            <img 
              src={livre.image} 
              alt={livre.title} 
              className="max-w-1/3 h-auto rounded-full hover:scale-50 transition-transform duration-50 cursor-pointer" 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LivrePage;