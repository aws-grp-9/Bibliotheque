"use client"

import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import './modal.css';

interface Book {
    id: number;
    title: string;
    author: string; // Nouvel attribut pour le nom de l'auteur
    available: boolean;
    imageUrl: string;// Nouvel attribut pour l'URL de l'image du livre

  }


  const bookpage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);





  // Liste des livres (exemple)
  const bookList: Book[] = [
    {
      id: 1,
      title: 'Livre php 1',
      author: 'Auteur 1',
      available: true,
      imageUrl: '/php.jpg'
    },
    {
      id: 2,
      title: 'Livre java',
      author: 'Auteur 2',
      available: false,
      imageUrl: '/java.jpg'
    },
    {
      id: 3,
      title: 'Livre programmation',
      author: 'Auteur 3',
      available: true,
      imageUrl: '/programmation.jpg'
    },

    {
      id: 4,
      title: 'Livre 4',
      author: 'Auteur 4',
      available: true,
      imageUrl: '/html.jpg'
    },




    // Ajoutez d'autres livres si nécessaire
  ];

  // Filtrer la liste de livres en fonction du terme de recherche
  const filteredBooks = bookList.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


    const reserveBook = (book: Book) => {
        setSelectedBook(book);
      };

      const closeModal = () => {
        setSelectedBook(null);
  };


  const borrowBook = (book: Book) => {
    if (!borrowedBooks.find(b => b.id === book.id)) {
      setBorrowedBooks([...borrowedBooks, book]);
    }
  };

  const returnBook = (book: Book) => {
    setBorrowedBooks(borrowedBooks.filter(b => b.id !== book.id));
  };

  return (

    <div className="bg-gray-100 min-h-screen">
    <Navbar />
    <main className="text-center py-10">
      <h1 className="text-5xl font-bold mb-6">Ressources en Informatique</h1>
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg mb-6 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
       
      />
     <div className="flex flex-wrap justify-center">
        {filteredBooks.map(book => (
         <div key={book.id} className="bg-white shadow-md rounded-lg p-4">
         <div className="bg-white shadow-md rounded-lg p-4 relative overflow-hidden transition-transform duration-150 ease-in-out transform hover:scale-50">
         <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover transition-opacity duration-150 ease-in-out group-hover:opacity-70"
                />
         </div>
         <p className="text-lg font-semibold mb-2">{book.title}</p>
         <p className="text-gray-600">{book.author}</p>
     </div>

        ))}
      </div>
      <h2 className="text-2xl font-bold mt-10">Livres empruntés</h2>
      <ul className="text-left">
        {borrowedBooks.map(book => (
          <li key={book.id} className="mb-2">{book.title} - {book.author}</li>
        ))}

      </ul>
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedBook(null)}>&times;</span>
            <h2>{selectedBook.title}</h2>
            <p>Disponible: {selectedBook.available ? 'Oui' : 'Non'}</p>
          </div>
        </div>
      )}
    </main>
    <Footer />
  </div>
);
}

export default bookpage ;
