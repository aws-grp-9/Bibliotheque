"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { AvailabilitiesModal } from '@/components/ui/availabilities-loans';
import { boolean } from 'zod';
import { useParams } from 'next/navigation';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const bookId = useParams().id;

  // Fonction pour gérer la réservation du livre et enregistrer la date
  const handleReservation = () => {
    const dateReservation = new Date().toLocaleDateString(); // Obtenir la date actuelle
    // open a modal with all the details

  };

  const fetchBook = async () => {
    console.log(bookId);
    // fetch the book data from the API
    const request = new Request('http://localhost:3000/api/books/id/' + bookId,{
      method: 'GET'
    });
    const response = await fetch(request);
    const data = await response.json();
    if (data.result) {
      setLivre(data.result);
      if (livre?.summary !== "" && livre?.summary !== undefined){
        const div = document.getElementById('info_div');
        const p = document.createElement('p');
        p.className = "text-gray-700 mb-4";
        p.innerHTML = `<span class="font-bold">Résumé</span> : ${livre?.summary}`;
        div?.appendChild(p);
      }
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
      <div className="container mx-auto py-8" id='info_div'>
    
        {/* Affichage des informations du livre */}
        <h1 className="text-3xl font-bold mb-4 text-center">{livre?.title}</h1>
        <img src={livre?.image} alt="Image du livre" className="mb-4 w-40" />
        <p className="text-gray-700 mb-2"><span className="font-bold">Auteur</span> : {livre?.author}</p>
        {/* Autres informations sur le livre */}

        {/* Bouton pour réserver le livre */}
        <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform duration-300 hover:scale-110" onClick={() => setShowModal(!showModal)}>
          Réserver ce livre
        </button>
        {showModal && <AvailabilitiesModal setShowModal={setShowModal} bookId={bookId.toString()} />}
      </div>
      <Footer />
    </div>
  );
};

export default LivrePage;
