"use client";
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
interface Book {
  id: number;
  date: string;
  description: string;
  ISBN: string;
  genre: string;
  title: string;
  author: string; // Nouvel attribut pour le nom de l'auteur
  available: boolean;
  image: string;
}

const BookPage = () => {
  const [bookList, setBookList] = React.useState<Book[]>([]);
  const [searchTerms, setSearchTerms] = React.useState('');

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
    if (data.result === undefined || data.result.length === 0) {
      console.log('No books found');
      setBookList([]);
      console.log('Booklist:', bookList);
    }
    setBookList(data.result);
  }

  React.useEffect(() => {
    fetchBooks(searchTerms);
  }, []);

  React.useEffect(() => {
    fetchBooks(searchTerms);
  }, [searchTerms]);

  

  return (
    <>
      <Navbar />
                      <section className="max-w-4xl mx-auto my-10 px-4 ">
                      <h1 className=" mb-10 text-3xl font-extrabold tracking-tighter sm:leading-none lg:text-4xl bg-gradient-to-r from-red-500 via-green-2000 to-neutral-2000 dark:bg-clip-text inline-block bg-clip-text pr-3">
                          Bienvenue sur le guide Informatique
                        </h1>
                        <p className="mb-9">
                          Ce guide vous accompagne dans vos recherches en Informatique. Vous y trouverez les principales ressources pour commencer et approfondir vos recherches.
                        </p>


            <div className="flex items-center gap-3">
                <input
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                    type="text"
                    placeholder="Rechercher un livre..."
                    className="px-20 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    //value={searchQuery}
                    //onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookList.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="group relative w-full mx-auto my-4 overflow-hidden border border-gray-200 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 w-64 h-80">
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
