"useClient";
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';

const themes = [
  {
    name: 'Mathématiques',
    slug: 'mathematiques',
    image: '/math.jpg'
  },
  {
    name: 'Physique',
    slug: 'physique',
    image: '/physics.jpg'
  },
  {
    name: 'informatique',
    slug: 'informatique',
    image: '/informatique.jpg'
  },
  {
    name: 'litterature',
    slug: 'litterature',
    image: '/litterature.jpg'
  },
  {
    name: 'chimie',
    slug: 'chimie',
    image: '/chimie.jpg'
  },
  {
    name: 'art',
    slug: 'art',
    image: '/art.jpg'
  },
  {
    name: 'langue',
    slug: 'langues',
    image: '/langue.jpg'
  },
  {
    name: 'histoire',
    slug: 'histoire',
    image: '/histoire.jpg'
  },
  {
    name: 'geographie',
    slug: 'geographie',
    image: '/geographie.jpg'
  },
  {
    name: 'SVT',
    slug: 'Biologie',
    image: '/SVT.png'
  }
];


const BookCatalog = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto my-10 px-4">
        <h2 className="text-2xl font-bold mb-4">LES GUIDES PAR DISCIPLINES</h2>
        <p className="text-lg text-gray-600 mb-4">
        Les bibliothécaires vous guident pour vous aider à identifier et à accéder aux ressources documentaires incontournables et spécialisées dans votre domaine
        </p>
        <p className="text-sm text-gray-500 italic">
          Vous pouvez également cliquer sur les thèmes ci-dessous pour explorer nos collections de livres.
        </p>
      </section>
      <div className="flex flex-wrap justify-center">
        {themes.map((theme) => (
          <Link key={theme.slug} href={`/themes/${theme.slug}`}>
            <div className="group relative w-48 h-48 mx-4 my-4 overflow-hidden border border-gray-200 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-70"
              />
              <h2 className="absolute bottom-0 left-0 right-0 text-center text-white font-bold bg-black bg-opacity-60 py-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                {theme.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BookCatalog;


