"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';

// Définir une interface pour les données du livre
interface Book {
  id: number;
  date: string;
  summary: string;
  ISBN: string;
  genre: string;
  title: string;
  author: string; // Nouvel attribut pour le nom de l'auteur
  available: boolean;
  image: string;
}

const LivrePage = () => {
  // Supposons que nous avons un livre fictif
  const [livre, setLivre] = useState<Book>();

  // Fonction pour gérer la réservation du livre et enregistrer la date
  const handleReservation = () => {
    const dateReservation = new Date().toLocaleDateString(); // Obtenir la date actuelle
    alert(`Vous avez réservé le livre le ${dateReservation} !`);
    // Ici, vous pouvez ajouter la logique de réservation du livre
    // Par exemple, faire une requête à un backend pour enregistrer la réservation avec la date
  };

  const fetchBook = async () => {
    // get book id from the URL
    const bookId = window.location.pathname.split('/').pop();
    console.log(bookId);
    // fetch the book data from the API
    const request = new Request('http://localhost:3000/api/books/id/' + bookId,{
      method: 'GET'
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    if (data.result) {
      setLivre(data.result);
    } else {
      alert('Le livre demandé n\'existe pas');
    }
  }

  React.useEffect(() => {
    fetchBook();
  }, []);


  return (
    <div className="bg-blanc-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
    
        {/* Affichage des informations du livre */}
        <h1 className="text-3xl font-bold mb-4 text-center">{livre?.title}</h1>
        <p className="text-gray-700 mb-2"><span className="font-bold">Auteur</span> : {livre?.author}</p>
        <p className="text-gray-700 mb-4"><span className="font-bold">Résumé</span> : {livre?.summary}</p>
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
