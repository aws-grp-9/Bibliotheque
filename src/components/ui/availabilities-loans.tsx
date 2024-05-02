"use client";

import React, { useEffect, useState } from 'react';

// TypeScript definition for props
type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
  openReservationModal: () => void;
};

export function AvailabilitiesModal({ setShowModal, bookId , openReservationModal }: ModalProps) {
  const [libraries, setLibraries] = useState<any[]>([]);

  const fetchAvailabilities = async () => {
    // Fetch the book data from the API
    const response1 = await fetch(`http://localhost:3000/api/library/`);
    const data1 = await response1.json();
    if (!data1.result) {
      alert('Erreur lors de la récupération des bibliothèques');
      return;
    }
    
    const libraryData = await Promise.all(data1.result.map(async (library: any) => {
      const response2 = await fetch(`http://localhost:3000/api/library/${library.id}/stocks/${bookId}`);
      const data2 = await response2.json();
      return { ...library, quantity: data2.result?.quantity || 0 };
    }));
    
    setLibraries(libraryData);
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []); 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowModal(false)}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 border border-gray-300 shadow-lg rounded-md" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-gray-700 font-semibold mb-4">Disponibilités:</h4>
          <div className="grid justify-items-end justify-between mb-4">
          {libraries.map(library => (
            <p key={library.id} className="text-gray-700 mb-4">
              <span className="font-bold">{library.name}</span>: {library.quantity} exemplaires 
              <button id='reserve-button'
                className="ml-2 py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={openReservationModal}
                disabled={library.quantity === "0"}>
                Réserver
              </button>
            </p>
          ))}
          </div>
          <button 
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
