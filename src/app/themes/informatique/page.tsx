"use client";
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import handleSearch from "@/components/ui/header";
import searchQuery from "@/components/ui/header";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
    const fetchMoreButton = document.getElementById('fetchMoreButton');
    headers.append('numberBooks', '12');
    headers.append('keywords', keywords);
    headers.append('genre', 'Informatique');
    console.log("GEGHGEO");
    const request = new Request(`${API_URL}/api/books`, {
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
      // hide the button
      if (!fetchMoreButton!.classList.contains('hidden')) {
        fetchMoreButton!.classList.add('hidden');
      }
    } else {
      fetchMoreButton!.classList.remove('hidden');
      setBookList(data.result);
    }
  }

  const fetchMore = async (keywords:string='') => {
    // fetch more books
    // add infos to headers
    const headers = new Headers();
    const fetchMoreButton = document.getElementById('fetchMoreButton');
    const excluded_ids = bookList.map(book => book.id);
    console.log('Excluded ids:', excluded_ids);
    headers.append('excluded_ids', JSON.stringify(excluded_ids));
    headers.append('numberBooks', '12');
    headers.append('keywords', keywords);
    headers.append('genre', 'Informatique');
    const request = new Request(`${API_URL}/api/books`, {
      method: 'GET',
      headers: headers,
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    if (data.result === undefined || data.result.length === 0) {
      console.log('No books found');
      console.log('Booklist:', bookList);
      // hide the button
      if (!fetchMoreButton!.classList.contains('hidden')) {
        fetchMoreButton!.classList.add('hidden');
      }
    } else {
      fetchMoreButton!.classList.remove('hidden');
      // add new books to the list
      setBookList([...bookList, ...data.result]);
    }
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
        <div className="grid justify-center hidden" id='fetchMoreButton'>
          <Button onClick={() => fetchMore(searchTerms)} variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-200 hover:bg-green-600 text-white align-middle">Voir plus</Button>
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
