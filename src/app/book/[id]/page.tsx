"use client";

import React, { useState } from 'react';

import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { AvailabilitiesModal } from '@/components/ui/availabilities-loans';
import { ReservationModal } from '@/components/ui/ReservationModal'
import { useParams } from 'next/navigation';
import StarRating from 'react-star-ratings';
import { createClient } from '@/utils/supabase/client';


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

  // Ajouter un état pour stocker les avis des utilisateurs
  const [userReview, setUserReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [avg_ratings, setAvgRatings] = useState<string>("");
  const [reviews, setReviews] = useState<any>([]);

  // Infos utilisateur
  const [user,setUser] = useState<any>(null);

  // Fonction pour gérer la saisie de l'utilisateur
  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Fonction pour soumettre l'avis
  const submitReview = async () => {
    const supabase = createClient();
    const { data , error } = await supabase.auth.getUser();
    if (error || !data) {
      console.log('Error while fetching user data');
      return;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      user_token : data,
      rating: rating,
      review: userReview,
    };
    const response = await fetch(`${API_URL}/api/books/id/${bookId}/reviews`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
    const query_data = await response.json();
    if (response.status === 200) {
      // add the new review to the list
      setReviews([...reviews, {id: query_data.result.id, name: user.name, stars: rating, description: userReview}]);
      // calculate the new average rating
      const new_avg = (parseFloat(avg_ratings) * reviews.length + rating) / (reviews.length + 1);
      setAvgRatings(new_avg.toFixed(1));
      // Réinitialiser le champ de saisie après la soumission
      setUserReview('');
      setRating(0);
    } else {
      console.log(query_data.message);
    }
  };

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
    // fetch the book data from the API
    const request = new Request(`${API_URL}/api/books/id/` + bookId,{
      method: 'GET'
    });
    const response = await fetch(request);
    const data = await response.json();
    if (data.result) {
      setLivre(data.result);
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
        }
      }
    } else {
      alert('Le livre demandé n\'existe pas');
    }
  }

  const fetchReviews = async () => {
    // fetch the reviews data from the API
    const request = new Request(`${API_URL}/api/books/id/${bookId}/reviews`,{
      method: 'GET'
    });
    const response = await fetch(request);
    const data = await response.json();
    if (data.result) {
      setReviews(data.result.reviews);
      setAvgRatings(parseFloat(data.result.average_rating).toFixed(1));
    } else {
      console.log('Aucun avis pour le moment');
    }

  }

  const fetchUserData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log('Error while fetching user data');
      return;
    }
    if (!data) {
      return;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('email', data?.user?.email || '');
    const response = await fetch(`${API_URL}/api/user/email`,{
      method: 'GET',
      headers: headers,
    });
    const query_data = await response.json();
    if (response.status !== 200) {
      console.log('Error while fetching user data');
      return;
    }
    setUser(query_data.result);
  }
  React.useEffect(() => {
    fetchUserData();
    fetchBook();
    fetchReviews();
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
            <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-transform duration-300 hover:scale-110" onClick={() => setShowModal(!showModal)}>
              Réserver ce livre
            </button>
            </div>
            <div id='reviews_div' className='w-2/6' >
              {avg_ratings!=='' && !isNaN(parseFloat(avg_ratings)) ?(
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">Avis</h2>
                  <p className="text-sm content-center">Note : {avg_ratings}/5 étoiles</p>
                </div>
              ) : (
                <h2 className="text-2xl font-bold mb-4">Avis</h2>
              )}
              {reviews.length === 0 ? (
                <p className="text-gray-700 mb-4">Aucun avis pour le moment</p>
              ) : (
                <div>
                  {reviews.map((review: any) => (
                    <div key={review.id} className="border border-gray-300 p-2 rounded-md mb-2">
                      <div className='flex w-11/12 justify-between'>
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        <span className="text-sm content-center">{review.stars}/5 étoiles</span>
                      </div>
                      <p className='w-11/12 break-words'>{review.description}</p>
                    </div> 
                  ))}
                </div>
              )}
            
            {user !== null ? (
              <div>
            <textarea
              value={userReview}
              onChange={handleReviewChange}
              placeholder="Écrivez votre avis sur ce livre..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
            <div className="mt-1 mb-2 flex justify-center">
                <StarRating
                  rating={rating}
                  starRatedColor="gold"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                  starHoverColor="rgb(22,163,74)"
                />
            </div>
            {/* Bouton pour soumettre l'avis */}
            <button
              onClick={submitReview}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-auto ml-auto transition-transform duration-300 hover:scale-110"
            >
              Soumettre l'avis
            </button></div>) : (
              <p className="text-gray-700 mb-4">Connectez-vous pour laisser un avis</p>
            )}
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
