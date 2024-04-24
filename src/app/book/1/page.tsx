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
}

const LivrePage = () => {
  // Supposons que nous avons un livre fictif
  const [livre, setLivre] = useState<Livre>({
    id: 1,
    title: "Technologies et protocoles Internet",
    author: "Douglas Adams",
    summary: "Un résumé du livre...",
    image: "/chemin/vers/image.jpg",
    // D'autres informations sur le livre...
  });

  // Fonction pour gérer la réservation du livre et enregistrer la date
  const handleReservation = () => {
    const dateReservation = new Date().toLocaleDateString(); // Obtenir la date actuelle
    alert(`Vous avez réservé le livre le ${dateReservation} !`);
    // Ici, vous pouvez ajouter la logique de réservation du livre
    // Par exemple, faire une requête à un backend pour enregistrer la réservation avec la date
  };

  return (
    <div className="bg-blanc-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
    
        {/* Affichage des informations du livre */}
        <h1 className="text-3xl font-bold mb-4 text-center">{livre.title}</h1>
        <p className="text-gray-700 mb-2"><span className="font-bold">Auteur</span> : {livre.author}</p>
        <p className="text-gray-700 mb-4"><span className="font-bold">Résumé</span> : {livre.summary}</p>
        {/* Autres informations sur le livre */}

        {/* Bouton pour réserver le livre */}
        <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform duration-300 hover:scale-110" onClick={handleReservation}>
          Réserver ce livre
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LivrePage;
