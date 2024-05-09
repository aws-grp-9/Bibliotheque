// ReservationModal.js
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { start } from 'repl';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type AllongementModalProps = {
  cancelAllongementModal : (arg0: boolean) => void;
  setErrorMessage : (arg0: string) => void;
  setSuccessMessage : (arg0: string) => void;
  choosenLoan : string;
};

export function AllongementModal({ cancelAllongementModal , setErrorMessage, setSuccessMessage, choosenLoan } : AllongementModalProps){

  const confirmAllongement = async () => {
    // get the current date
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);
    // get user_id from the session
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert('Erreur lors de la récupération de la session');
      return;
    }
    const headers1 = new Headers();
    headers1.append('Content-Type', 'application/json');
    headers1.append('email', data?.user.email || '');
    const response1 = await fetch(`${API_URL}/api/user/email`,{
      method: 'GET',
      headers: headers1,
    });
    const query_data1 = await response1.json();
    if (!query_data1.result) {
      setErrorMessage('Erreur lors de la récupération de l\'utilisateur');
      cancelAllongementModal(false);
      return;
    }
    const user_id = query_data1.result.id;
    // check if the loan have been already extended
    const headers2 = new Headers();
    headers2.append('LoanType', 'all');
    headers2.append('user_token', JSON.stringify(data));
    headers2.append('reason',"extend");

    const response3 = await fetch(`${API_URL}/api/loans/`+choosenLoan, {
      method: 'PATCH',
      headers: headers2,
      body: JSON.stringify({user_token : data}),
    });
    const query_data3 = await response3.json();
    if (!query_data3.result) {
      setErrorMessage(query_data3.message);
      cancelAllongementModal(false);
      return;
    }
    setSuccessMessage('Allongement effectuée avec succès');
    cancelAllongementModal(false);
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => cancelAllongementModal(false)}>
      {/* Contenu du modal de réservation */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 border border-gray-300 shadow-lg rounded-md" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-gray-700 font-semibold mb-4">Voulez-vous confirmer l'allongement de votre prêt ?</h4>
          {/* Formulaires et boutons */}
          <div className='flex justify-evenly'>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:outline-none" onClick={()=> confirmAllongement()} >Confirmer</button>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none" onClick={() => cancelAllongementModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
