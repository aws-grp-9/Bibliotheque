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
  const themes = [
    { name: 'Informatique', slug: 'nformatique' },
    { name: 'Mathématiques', slug: 'athématiques' },
    { name: 'Physique', slug: 'hysique' },
    { name: 'chimie', slug: 'chimie' },
    { name: 'art', slug: 'art' },
    { name: 'langue', slug: 'langue' },
    { name: 'histoire', slug: 'histoire' },
    { name: 'geographie', slug: 'geographie' },
    { name: 'SVT', slug: 'SVT' },
  ];

  const bookpage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  

  // Liste des livres (exemple)
  const bookList: Book[] = [
    { id: 1, title: 'Livre 1', author: 'Auteur 1', available: true, imageUrl: '/images/telechargement.jpg' },
    { id: 2, title: 'Livre 2', author: 'Auteur 2', available: false, imageUrl: '/images/telechargement.jpg' },
    { id: 3, title: 'Livre 3', author: 'Auteur 3', available: true, imageUrl: '/images/telechargement.jpg' },
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

 
  return (
    
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#333' }}>Ressources en informatique</h1>
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '80%',
            maxWidth: '500px',
            border: '2px solid #ccc',
            borderRadius: '20px',
            marginBottom: '20px',
            outline: 'none',
          }}
        />
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}> {/* Ajustement du style pour aligner les livres à gauche */}
          {filteredBooks.map(book => (
            <li key={book.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <img src={book.imageUrl} alt={book.title} style={{ width: '150px', marginRight: '20px' }} />
              <button onClick={() => reserveBook(book)} style={{ padding: '10px 20px', fontSize: '16px' }}>
                {book.title} - {book.author}
              </button>
            </li>
          ))}
        </ul>
        {selectedBook && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
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
