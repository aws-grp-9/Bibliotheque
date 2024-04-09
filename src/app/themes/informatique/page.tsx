import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import handleSearch from "@/components/ui/header";
import searchQuery from "@/components/ui/header";


// Liste des livres avec leurs détails
const books = [
  {
    id: 1,
    title: 'Learn',
    author: 'Auteur 1',
    image: '/MPI.png',
    slug: 'livre-1'
  },
  {
    id: 2,
    title: 'Learn',
    author: 'Auteur 2',
    image: '/fondement.jpeg',
    slug: 'livre-2'
  },
  {
    id: 3,
    title: 'Learn',
    author: 'Auteur 2',
    image: '/windows.jpg',
    slug: 'livre-3'
  },
  {
    id: 4,
    title: 'Learn',
    author: 'Auteur 4',
    image: '/bd.jpeg',
    slug: 'livre-4'
  },
  // Ajoutez d'autres livres si nécessaire
];

const BookPage = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-4xl font-bold mb-4">Livres disponibles</h2>
                        
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Rechercher un livre..."
                    className="px-20 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    //value={searchQuery}
                    //onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link key={book.id} href={`/livres/${book.slug}`}>
              <div className="group relative w-full mx-auto my-4 overflow-hidden border border-gray-200 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                />

    
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <p className="text-white text-lg font-bold text-center">{book.title}</p>
                </div>
              </div>
            </Link>
            
          ))}
        </div>
      </section>
      <div className="mt-4">
              <Link href="/articles">
              <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-200 hover:bg-green-600 text-white">Plus de ressources ICI</Button>
              </Link>
          </div>
      <Footer />
   </>
  );
};

export default BookPage;
