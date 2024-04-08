"use client"

import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import './modal.css';
import BookCatalog from '@/app/book/page';

interface Book {
    id: number;
    date: string;
    description: string;
    ISBN: string;
    genre: string;
    title: string;
    author: string; // Nouvel attribut pour le nom de l'auteur
    available: boolean;
    imageUrl: string;// Nouvel attribut pour l'URL de l'image du livre

  }


  const bookpage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookList, setBookList] = useState<Book[]>([]);
    // Fetch books from an API Address : localhost:3000/api/books
    const fetchBooks = async (keywords:string='') => {
      // add infos to headers
      const headers = new Headers();
      headers.append('numberBooks', '10');
      headers.append('keywords', keywords);
      headers.append('genre', 'Informatique');
      const request = new Request('http://localhost:3000/api/books', {
        method: 'GET',
        headers: headers,
      });
      const response = await fetch(request);
      const data = await response.json();
      console.log(data);

      // Return the list of books in Book format
      if (data.result === undefined || data.result.length === 0) {
        console.log('No books found');
        setBookList([]);
        console.log('Booklist:', bookList);
      }
      setBookList(data.result);
    }


    // when typing in the search bar, fetch books



  const reserveBook = (book: Book) => {
      setSelectedBook(book);
  };
    
  const closeModal = () => {
    setSelectedBook(null);
  };

  React.useEffect(() => {
    fetchBooks(searchTerm);
  }, []);

  React.useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);

  
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
          {bookList.map(book => (
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
