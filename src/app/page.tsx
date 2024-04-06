"useClient"
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";


const NewsSection = () => {
    // Supposons que vous récupériez les actualités à partir d'une source de données
    const newsData = [
        {
            id: 1,
            title: 'Nouvelle exposition à la bibliothèque universitaire',
            date: '2024-04-10',
            link: '/exposition'
        },
        {
            id: 2,
            title: 'Conférence sur les dernières avancées en mathématiques',
            date: '2024-04-18',
            link: '/conference'
        },
        {
          id: 3,
          title: 'Semaine de l/innovation à l/université',
          date: '2024-04-01',
          link: '/semaine-innovation'
        },
        // Ajoutez d'autres actualités ici
    ];

    return (
      <section className="max-w-2xl mx-auto my-5 px-2">
          <h2 className="text-4xl font-bold mb-9 text-center text-gray-2000">Actualités</h2>
          <div className="grid grid-cols-3 gap-5"> {/* Modifier grid-cols-1 pour n'avoir qu'une colonne */}
              {newsData.map((news) => (
                  <div key={news.id} className="w-full">
                      <Link href={news.link} passHref>
                          <div>
                                <div className="bg-green-500 rounded-md p-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    <h3 className="text-lg font-bold mb-2 text-gray-900">{news.title}</h3>
                                    <p className="text-xs text-gray-600 mt-2">Date : {news.date}</p>
                                </div>
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
          <div className="mt-4">
              <Link href="/actualites">
              <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-500 hover:bg-green-600 text-white">Toutes vos actualités ICI</Button>
              </Link>
          </div>
      </section>
  );
};


export default function Home() {
    return (
        <>
            <Navbar />
            <main className="max-w-[1340px] mx-auto px-2">
                <section className='hero mx-auto max-w-3xl px-4 pt-12 sm:pt-24 lg:pt-28' style={{
                    //backgroundImage: 'url(/bg__hero.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#1cda9b', // Couleur de fond vert
                    color: '#FFFFFF', // Couleur du texte blanc
                }}>
                    <section className="mt-10 text-center">
                        <h1 className="text-6xl font-extrabold tracking-tighter sm:leading-none lg:text-7xl bg-gradient-to-r from-red-500 via-green-500 to-neutral-600 dark:bg-clip-text dark:text-transparent inline-block text-transparent bg-clip-text pr-1">
                            BIBLIOTHEQUE UNIVERSITAIRE
                        </h1>
                        <p className="mt-3 text-base font-medium text-black dark:text-white sm:mt-5 sm:text-lg md:text-xl lg:text-2xl tracking-wide">
                            Rechercher dans les collections de bibliothèque.
                        </p>
                       
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row md:gap-6 sm:justify-center">
                            <Link href={/* user ? "/dashboard":  */"/auth/login"}>
                                <Button variant="success" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit text-white">{/* user ? "Aller au tableau de bord": */ "Rejoindre la communauté"}</Button>
                            </Link>
                            <Link href="/book">
                                <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit ">Visiter la bibliothèque</Button>
                            </Link>
                        </div>
                    </section>
                </section>
                <NewsSection />
                <section className='py-24 sm:py-32 pointer-events-auto'>
                    <div className="mx-auto max-w-[1340px] px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Travaillons ensemble</h2>
                            <p className="mt-6 text-lg leading-8 dark:text-neutral-300 font-medium">Créer votre compte pour ainsi contribuer au bien-être et au partage de connaissances au sein d&#039;e L'UVSQ</p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 dark:text-gray-300">Livres enregistrés</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">500</dd>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 dark:text-gray-300">Étudiants inscrits</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">210+</dd>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 dark:text-gray-300">Articles ajoutés par semaine</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">10</dd>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 dark:text-gray-300">Accès aux données</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">Illimité et gratuit</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

