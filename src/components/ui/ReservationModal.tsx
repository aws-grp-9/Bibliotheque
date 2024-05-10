// ReservationModal.js
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { start } from 'repl';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type ReservationModalProps = {
  cancelReservationModal : (arg0: boolean) => void;
  showError : (arg0: string) => void;
  showSuccess : (arg0: string) => void;
  choosenLibrary : any;
  bookId : string;
};

export function ReservationModal({ cancelReservationModal , showError, showSuccess, choosenLibrary ,bookId } : ReservationModalProps){

  const confirmReservation = async () => {
    // get the current date
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);
    // get user_id from the session
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      showError('Erreur lors de la récupération de la session');
      return;
    }
    const headers1 = new Headers();
    headers1.append('Content-Type', 'application/json');
    headers1.append('user_token', JSON.stringify(data));
    const response1 = await fetch(`${API_URL}/api/user/personnal`,{
      method: 'GET',
      headers: headers1,
    });
    const query_data1 = await response1.json();
    if (!query_data1.result) {
      showError('Erreur lors de la récupération de l\'utilisateur');
      return;
    }
    const user_id = query_data1.result.id;
    console.log(user_id);

    // check if a loan is already in progress
    const headers2 = new Headers();
    headers2.append('LoanType', 'pending');
    headers2.append('user_token', JSON.stringify(data));
    const response2 = await fetch(`${API_URL}/api/loans/personnal`, {
      method: 'GET',
      headers: headers2,
    });
    const query_data2 = await response2.json();
    console.log(query_data2);
    // search in list of pending loans if book is already reserved
    if (query_data2.result) {
      const alreadyReserved = query_data2.result.find((loan: any) => loan.id_book === bookId);
      if (alreadyReserved) {
        showError('Vous avez déjà réservé ce livre');
        return;
      }
    }

    const response3 = await fetch(`${API_URL}/api/loans/`+user_id, {
      method: 'POST',
      body: JSON.stringify({ id_book : bookId , start_date : start_date  , end_date : end_date , id_library : choosenLibrary}), 
    });
    const query_data3 = await response3.json();
    if (!query_data3.result) {
      showError('Erreur lors de la réservation');
      return;
    }
    showSuccess('Réservation effectuée avec succès');
    cancelReservationModal(false);
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => cancelReservationModal(true)}>
      {/* Contenu du modal de réservation */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 border border-gray-300 shadow-lg rounded-md" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-gray-700 font-semibold mb-4">Voulez-vous confirmer votre réservation ?</h4>
          {/* Formulaires et boutons */}
          <div className='flex justify-evenly'>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:outline-none" onClick={()=> confirmReservation()} >Confirmer</button>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none" onClick={() => cancelReservationModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
