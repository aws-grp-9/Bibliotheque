'use client'
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';

const NewsSection = () => {
  // Supposons que vous récupériez les actualités à partir d'une source de données
  const newsData = [
    {
      id: 1,
      title: 'Nouvelle exposition à la bibliothèque universitaire',
      description: 'Venez découvrir notre nouvelle exposition sur l\'histoire de la physique quantique. Du 15 au 30 avril.',
      date: '2024-04-10',
      image: 'exposition.png',
      link: '/exposition'
    },
    {
      id: 2,
      title: 'Conférence sur les dernières avancées en mathématiques',
      description: 'Assistez à notre conférence avec des chercheurs de renommée mondiale. Le 25 avril à 14h.',
      date: '2024-04-18',
      image: 'exposition.png',
      link: '/exposition'
    },
    {
      id: 3,
      title: 'Semaine de l\'innovation à l\'université',
      description: 'Participez à la semaine de l\'innovation où de nombreux ateliers et conférences auront lieu. Du 10 au 15 avril.',
      date: '2024-04-01',
      image: 'exposition.png',
      link: '/exposition'
    },
    {
      id: 4,
      title: 'Appel à contributions pour le journal scientifique',
      description: 'Soumettez vos articles pour la prochaine édition du journal scientifique de l\'université. Date limite : 30 avril.',
      date: '2024-03-25',
      image: 'exposition.png',
      link: '/exposition'
    },
    {
      id:5,
      title: 'Conférence sur l\'intelligence artificielle',
      description: 'Ne manquez pas la conférence sur les avancées récentes en intelligence artificielle. Le 20 avril à 16h.',
      date: '2024-04-10',
      image: 'exposition.png',
      link: '/exposition'
    },
    // Ajoutez d'autres actualités ici
  ];

  return (
    <section className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-5xl font-bold mb-4 text-center text-gray-600">Dernières Actualités</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newsData.map((news) => (
          <Link key={news.id} href={news.link} passHref>
            <div className="block">
              <div className="bg-green-200 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between h-full">
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover rounded-t-lg mb-6" /> {/* Affichage de l'image */}
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h3>
                  <p className="text-base text-gray-700">{news.description}</p>
                </div>
                <p className="text-sm text-gray-600 mt-4">Date : {news.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Page principale Home
export default function Home() {
  return (
    <>
      <Navbar />
      {/* Ajout de la section des actualités */}
      <NewsSection />
      {/* Votre contenu existant */}
      <Footer />
    </>
  );
}
