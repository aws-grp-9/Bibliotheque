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
    name: 'Informatique',
    slug: 'informatique',
    image: '/informatique.jpg'
  },
  {
    name: 'Littérature',
    slug: 'litterature',
    image: '/litterature.jpg'
  },
  {
    name: 'Chimie',
    slug: 'chimie',
    image: '/chimie.jpg'
  },
  {
    name: 'Art',
    slug: 'art',
    image: '/art.jpg'
  },
  {
    name: 'Langues',
    slug: 'langues',
    image: '/langue.jpg'
  },
  {
    name: 'Histoire',
    slug: 'histoire',
    image: '/histoire.jpg'
  },
  {
    name: 'Géographie',
    slug: 'geographie',
    image: '/geographie.jpg'
  },
  {
    name: 'Biologie',
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


