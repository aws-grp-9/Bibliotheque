"use client"

import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';




const bookpage: React.FC = () => {
  // Déclaration de l'état pour la barre de recherche
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Déclaration de la liste de livres (exemple)
  const bookList = [
    { id: 1, title: 'Livre 1' },
    { id: 2, title: 'Livre 2' },
    { id: 3, title: 'Livre 3' },
    // Ajoutez autant de livres que nécessaire
  ];

  // Filtrer la liste de livres en fonction du terme de recherche
  const filteredBooks = bookList.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <main>
        <h1>Liste des livres</h1>
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {/* Liste des livres */}
        <ul>
          {filteredBooks.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default bookpage ;
