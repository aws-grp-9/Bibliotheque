// ReservationModal.js
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { start } from 'repl';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type BannissementModalProps = {
  cancelBannissementModal : (arg0: boolean) => void;
  setErrorMessage : (arg0: string) => void;
  setSuccessMessage : (arg0: string) => void;
  choosenUser: any;
};

export function BannissementModal({ cancelBannissementModal , setErrorMessage, setSuccessMessage, choosenUser } : BannissementModalProps){

  const confirmBannissement = async () => {

    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert('Erreur lors de la récupération de la session');
      return;
    }
    const headers = new Headers();
    headers.append('user_token', JSON.stringify(data));

    const response = await fetch(`${API_URL}/api/user/`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({user_id : choosenUser.id}),
    });
    const query_data = await response.json();
    if (!query_data.result) {
      setErrorMessage(query_data.message);
      cancelBannissementModal(false);
      return;
    }
    setSuccessMessage('Utilisateur banni avec succès');
    cancelBannissementModal(false);
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => cancelBannissementModal(false)}>
      {/* Contenu du modal de réservation */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 border border-gray-300 shadow-lg rounded-md" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-gray-700 font-semibold mb-4">Voulez-vous confirmer le bannissement de l'utilisateur {choosenUser.name} ?</h4>
          {/* Formulaires et boutons */}
          <div className='flex justify-evenly'>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:outline-none" onClick={()=> confirmBannissement()} >Confirmer</button>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none" onClick={() => cancelBannissementModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
