"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { AvailabilitiesModal } from '@/components/ui/availabilities-loans';
import { ReservationModal } from '@/components/ui/ReservationModal'
import { boolean } from 'zod';
import { useParams } from 'next/navigation';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Définir une interface pour les données du livre
interface Book {
  id: number;
  date: string;
  description: string;
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
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [choosenLibrary,setChoosenLibrary] = useState("");
  const bookId = useParams().id;


  const openReservationModal = () => {
    setShowModal(false);
    setShowReservationModal(true);
  };
  const cancelReservationModal = (showfirstmodal:boolean) => {
    setShowReservationModal(false);
    setShowModal(showfirstmodal);
    setChoosenLibrary("");
  }

  const fetchBook = async () => {
    console.log(bookId);
    // fetch the book data from the API
    const request = new Request(`${API_URL}/api/books/id/` + bookId,{
      method: 'GET'
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    if (data.result) {
      setLivre(data.result);
      console.log(data?.result.title);
      if (data?.result.description !== "" && data?.result.description !== undefined){
        const div = document.getElementById('info_div');
        let p = div?.querySelector('.book-description');
        if (!p) {
          p = document.createElement('p');
          p.className = "text-gray-700 mb-4 book-description max-w-96";
          let description = data?.result.description;
          if (description.length > 255) {
            description = description.substring(0, 255) + '...';
          }
          p.innerHTML = `<span class="font-bold">Résumé</span> : ${description}`;
          div?.insertBefore(p, div.querySelector('button'));
          console.log("Inserted");
        }
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
      <div className="container mx-auto py-8">
        
        {/* Affichage des informations du livre */}
        <h1 className="text-3xl font-bold mb-4 text-center">{livre?.title}</h1>
        <div id='book_div' className='flex justify-around'>
          <div id='info_div'>
          <img src={livre?.image} alt="Image du livre" className="mb-4 w-40" />
          <p className="text-gray-700 mb-2"><span className="font-bold">Auteur</span> : {livre?.author}</p>
          {/* Autres informations sur le livre */}

          {/* Bouton pour réserver le livre */}
          <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform duration-300 hover:scale-110" onClick={() => setShowModal(!showModal)}>
            Réserver ce livre
          </button>
        </div>
        <div id='reviews_div'>
          {/* Affichage des avis sur le livre */}
          <h2 className="text-2xl font-bold mb-4">Avis</h2>
          <p className="text-gray-700 mb-4">Aucun avis pour le moment</p>
        </div> 
      </div> 
      {showModal && <AvailabilitiesModal setShowModal={setShowModal} bookId={bookId.toString()} openReservationModal={openReservationModal} setChoosenLibrary={setChoosenLibrary} />}
      {showReservationModal && <ReservationModal  cancelReservationModal={cancelReservationModal}  choosenLibrary={choosenLibrary} bookId={bookId.toString()}/>}
      </div>
      <Footer />
    </div>
  );
};

export default LivrePage;
