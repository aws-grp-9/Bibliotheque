'use client'
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FaBook, FaStar, FaUserFriends, FaFileAlt, FaDatabase, FaCalendarAlt, FaImages } from 'react-icons/fa';

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-[1340px] mx-auto px-2 lg:px-10">
            <section className='hero mx-auto max-w-screen-3xl px-20 pt-36 sm:pt-44 lg:pt-52 opacity-90' style={{
                backgroundImage: 'url(/biblio3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#1cda9b', // Couleur de fond verte
                color: '#FFFFFF', // Couleur du texte blanc
            }}>



                    <section className="mt-10 text-center">
                    <h1 className="text-13xl font-extrabold tracking-tighter sm:leading-none lg:text-6xl bg-gradient-to-r from-red-500 via-green-2000 to-neutral-2000 dark:bg-clip-text inline-block bg-clip-text pr-3">
                        <span className="font-bold text-gray-900 dark:text-gray-100">""WELCOME   TO   THE   HOUSE   OF  KNOWLEDGE""</span>
                    </h1>

                    <h1 className="text-1xl font-extrabold tracking-tighter sm:leading-none lg:text-1xl bg-gradient-to-r from-red-500 via-black-700   bg-clip-text pr-2">
                        <i>Découvrez une source inépuisable de connaissances et d'inspiration depuis chez vous : plongez dans notre bibliothèque universitaire en ligne, votre passerelle virtuelle vers un monde de ressources académiques de premier plan.</i>
                    </h1>

                        <div className="mt-15 flex flex-col gap-5 sm:flex-row md:gap-8 sm:justify-center">
                        <Link href={/* user ? "/dashboard":  */"/auth/login"}>
                            <Button variant="success" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-orange-300 font-medium w-full sm:w-fit text-white bg-green-500 hover:bg-green-600">
                                {/* user ? "Aller au tableau de bord": */ "Rejoindre la communauté"}
                            </Button>
                        </Link>
                        <Link href="/book">
                            <Button variant="secondary" size={"lg"} className="active:scale-200 transition focus:outline focus:outline-gray-600 font-medium w-full sm:w-fit bg-green-500 hover:bg-green-600">
                                Visiter la bibliothèque
                            </Button>
                        </Link>

                        </div>
                    </section>
                </section>
                <NewsSection />
                <div className="my-20" />
                <HighlightSection />
                <section className='py-24 sm:py-32 pointer-events-auto'>
                    <div className="mx-auto max-w-[1340px] px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Travaillons ensemble</h2>
                            <p className="mt-6 text-lg leading-8 dark:text-neutral-300 font-medium">Créer votre compte pour ainsi contribuer au bien-être et au partage de connaissances au sein de l'université</p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col-reverse items-center">
                                    <FaBook className="text-5xl text-green-500" />
                                    <dt className="text-base leading-7 dark:text-gray-300">Livres enregistrés</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">+2500</dd>
                                </div>
                                <div className="flex flex-col-reverse items-center">
                                    <FaUserFriends className="text-5xl text-green-500" />
                                    <dt className="text-base leading-7 dark:text-gray-300">Étudiants inscrits</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">+210</dd>
                                </div>
                                <div className="flex flex-col-reverse items-center">
                                    <FaFileAlt className="text-5xl text-green-500" />
                                    <dt className="text-base leading-7 dark:text-gray-300">Articles ajoutés par semaine</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight dark:text-white">+10</dd>
                                </div>
                                <div className="flex flex-col-reverse items-center">
                                    <FaDatabase className="text-5xl text-green-500" />
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

// Les données des actualités
const newsData = [
    {
        id: 1,
        title: 'Nouvelle exposition à la bibliothèque universitaire',
        date: '2024-04-10',
        link: '/exposition',
        image: '/expo.jpeg' // Chemin vers l'image de l'exposition
    },
    {
        id: 2,
        title: 'Conférence sur les dernières avancées',
        date: '2024-04-18',
        link: '/conference',
        image: '/conf2.jpg' // Chemin vers l'image de la conférence
    },
    {
        id: 3,
        title: 'Semaine de l\'innovation à l\'université',
        date: '2024-04-01',
        link: '/semaine-innovation',
        image: '/conf3.jpeg' // Chemin vers l'image de la semaine de l'innovation
    },

];

const NewsSection = () => {
    return (
        <section className="max-w-7xl mx-auto my-5 px-2">
            <h2 className="text-4xl font-bold mb-9 text-left  dark:text-green-400 border-b-4 border-green-600 dark:border-green-400 pb-3">
                Évènements à venir
            </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {newsData.map((news) => (
                        <div key={news.id} className="w-full h-full">
                            <Link href={news.link} passHref>
                                <div className="font-green flex flex-col justify-between w-full h-full">
                                    <img src={news.image} alt={news.title} className="w-full h-auto rounded-md mb-2 shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105" />
                                    <div className="p-4 shadow-md transition duration-50 ease-in-out transform hover:scale-80">
                                        <h3 className="text-lg font-bold mb-2 text-gray-900">{news.title}</h3>
                                        <p className="text-xs text-gray-600 mt-2 mb-4 border-b border-gray-300 pb-2 font-bold">{news.date}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            <div className="mt-4">
            <Link href="/actualites">
                <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-500 hover:bg-green-600 text-white">
                    Toutes vos actualités ICI
                </Button>
            </Link>

            </div>
        </section>
    );
};


const HighlightSection = () => {
    const highlights = [
        {
            id: 1,
            title: 'Nouvelles acquisitions',
            description: 'Découvrez les derniers livres ajoutés à notre collection.',
            icon: <FaBook className="text-5xl text-green-500" />
        },
        {
            id: 2,
            title: 'Événements à venir',
            description: 'Consultez notre calendrier pour connaître les prochains événements.',
            icon: <FaCalendarAlt className="text-5xl text-green-500" />
        },
        {
            id: 3,
            title: 'Expositions en ligne',
            description: 'Visitez nos expositions en ligne pour découvrir de nouvelles œuvres.',
            icon: <FaImages className="text-5xl text-green-500" />
        },
        {
            id: 4,
            title: 'Nouvelles ressources disponibles',
            description: 'Explorez nos dernières ressources académiques et culturelles.',
            icon: <FaFileAlt className="text-5xl text-green-500" />
        },
    ];

    return (
        <section className="max-w-7xl mx-auto my-5 px-2">
           <h2 className="text-4xl font-bold mb-9 text-left  dark:text-green-400 border-b-4 border-green-600 dark:border-green-400 pb-3">
                Nouveautés et mises en avant
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map((highlight) => (
                    <div key={highlight.id} className="bg-green-50 p-6 shadow-md rounded-lg">
                        <div className="text-center">{highlight.icon}</div>
                        <h3 className="text-xl font-bold mt-4 mb-2">{highlight.title}</h3>
                        <p className="text-gray-700">{highlight.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};




export default Home;
