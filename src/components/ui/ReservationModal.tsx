// ReservationModal.js
import React from 'react';

type ReservationModalProps = {
  cancelReservationModal : (arg0: boolean) => void;
};

export function ReservationModal({ cancelReservationModal} : ReservationModalProps){
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => cancelReservationModal(true)}>
      {/* Contenu du modal de réservation */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 border border-gray-300 shadow-lg rounded-md" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-gray-700 font-semibold mb-4">Voulez-vous confirmer votre réservation ?</h4>
          {/* Formulaires et boutons */}
          <div className='flex justify-evenly'>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-green-600 focus:outline-none">Confirmer</button>
            <button className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none" onClick={() => cancelReservationModal(false)}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
