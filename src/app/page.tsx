"useClient"
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import carrousel from 'react';


const NewsSection = () => {
    const newsData = [
        {
            id: 1,
            title: 'Nouvelle exposition à la bibliothèque universitaire',
            date: '2024-04-10',
            link: '/exposition',
            image: '/conf.jpeg' // Chemin vers l'image de l'exposition
        },
        {
            id: 2,
            title: 'Conférence sur les dernières avancées en mathématiques',
            date: '2024-04-18',
            link: '/conference',
            image: '/conf2.jpg' // Chemin vers l'image de la conférence
        },
        {
            id: 3,
            title: 'Semaine de l/innovation à l/université',
            date: '2024-04-01',
            link: '/semaine-innovation',
            image: '/conf3.jpeg' // Chemin vers l'image de la semaine de l'innovation
        },
        {
            id: 3,
            title: 'Semaine de la culture à l/université',
            date: '2024-04-01',
            link: '/semaine-innovation',
            image: '/conf3.jpeg' // Chemin vers l'image de la semaine de l'innovation
        },
        {
            id: 3,
            title: 'Semaine de la recherche à l/université',
            date: '2024-04-01',
            link: '/semaine-innovation',
            image: '/conf3.jpeg' // Chemin vers l'image de la semaine de l'innovation
        },
        // Ajoutez d'autres actualités ici
    ];

    return (
        <section className="max-w-7xl mx-auto my-5 px-2" >
            <h2 className="text-6xl font-bold mb-9 text-left underline text-gray-2000">Actualités</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2"> {/* Utilisation de différentes colonnes pour les différentes tailles d'écrans */}
                {newsData.map((news) => (
                    <div key={news.id}>
                        <Link href={news.link} passHref>
                        <div className="carrousel-deco">
                            <div>
                                <img src={news.image} alt={news.title} className="w-full h-auto rounded-md mb-2 shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105" />
                                <div className="p-4  shadow-md transition duration-50 ease-in-out transform hover:scale-80">
                                    <h3 className="text-lg font-bold mb-2 text-gray-900">{news.title}</h3>
                                    <p className="text-xs text-gray-600 mt-2 mb-4 border-b border-gray-300 pb-2">{news.date}</p>
                                    <button className="owl-next" aria-label="Suivant"></button>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link href="/actualites">
                    <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-400 hover:bg-green-600 text-white">Toutes vos actualités ICI</Button>
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
                <section className='hero mx-auto max-w-8xl px-9 pt-19 sm:pt-24 lg:pt-30 opacity-70' style={{
                    backgroundImage: 'url(/biblio.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    //backgroundColor: '#1cda9b', // Couleur de fond vert
                    color: '#FFFFFF', // Couleur du texte blanc
                }}>

                    <section className="mt-10 text-center">
                    <h1 className="text-13xl font-extrabold tracking-tighter sm:leading-none lg:text-4xl bg-gradient-to-r from-red-500 via-green-2000 to-neutral-2000 dark:bg-clip-text inline-block  bg-clip-text pr-3">
                        ""WELCOME TO THE HOUSE OF KNOWLEDGE""
                        </h1>
                        <h1 className="text-2xl font-extrabold tracking-tighter sm:leading-none lg:text-2xl bg-gradient-to-r from-red-500 via-black-700 to-neutral-200 dark:bg-clip-text inline-block  bg-clip-text pr-3">
                        <i>"Découvrez une source inépuisable de connaissances et d'inspiration depuis chez vous : plongez dans notre bibliothèque universitaire en ligne, votre passerelle virtuelle vers un monde de ressources académiques de premier plan."</i>
                        </h1>
                       <div className="mt-15 flex flex-col gap-5 sm:flex-row md:gap-8 sm:justify-center">
                            <Link href={/* user ? "/dashboard":  */"/auth/login"}>
                                <Button variant="success" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-orange-300 font-medium w-full sm:w-fit text-white">{/* user ? "Aller au tableau de bord": */ "Rejoindre la communauté"}</Button>
                            </Link>
                            <Link href="/book">
                                <Button variant="secondary" size={"lg"} className="active:scale-200 transition focus:outline focus:outline-gray-600 font-medium w-full sm:w-fit ">Visiter la bibliothèque</Button>
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

