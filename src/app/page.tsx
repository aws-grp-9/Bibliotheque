import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="max-w-[1340px] mx-auto px-2 ">
        <section className='hero mx-auto max-w-3xl px-4 pt-12 sm:pt-24 lg:pt-28'
         style={{
          backgroundImage: 'url(/bg__hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1cda9b', // Couleur de fond vert
          color: '#FFFFFF', // Couleur du texte blanc
        }}>
          <section className='flex justify-center'>
              <Link href="/support" className="group dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 inline-flex active:scale-95 transition items-center hover:bg-gray-200 p-1 pr-2 text-black bg-gray-100 border-red-600 rounded-full sm:text-base lg:text-sm xl:text-base">
                  <div className="px-3 py-0.5 text-black dark:text-white text-xs font-semibold leading-5 uppercase tracking-wide rounded-full bg-gray-300 dark:bg-slate-900">
                    ⚡️Sponsor
                  </div>
                  <div className="ml-4 hidden text-sm sm:block">
                    Soutenez L'UVSQ aujourd&#039;hui en nous sponsorisant.
                  </div>
                  <div className="ml-4 text-sm sm:hidden">
                    Soutenez L'UVSQ
                  </div>          
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
              </Link>
          </section>
          <section className="mt-10 text-center">
          <h1 className="text-6xl font-extrabold tracking-tighter sm:leading-none lg:text-7xl bg-gradient-to-r from-red-500 via-green-500 to-neutral-600 dark:bg-clip-text dark:text-transparent inline-block text-transparent bg-clip-text pr-1">
                BIBLIOTHEQUE UNIVERSITAIRE
            </h1>
            <p className="mt-3 text-base font-medium text-black dark:text-white sm:mt-5 sm:text-lg md:text-xl lg:text-2xl tracking-wide">
              Bienvenue dans la bibliothèque numérique de l&#039;université de Versailles  Saint Quentin.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row md:gap-6 sm:justify-center">
              <Link href={/* user ? "/dashboard":  */"/auth/login"}>
                <Button variant="success" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit text-white">{/* user ? "Aller au tableau de bord": */ "Rejoindre la communauté"}</Button>
              </Link>
              <Link href="/documents">
                <Button variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit ">Visiter la bibliothèque</Button>
              </Link> 
            </div>
          </section>
        </section>
        <section className='pt-10 md:pt-14 lg:pt-20 pb-5 border-b border-gray-300 dark:border-neutral-600 sm:border-none mx-2'>
          <div className='text-center text-sm font-medium text-gray-600 dark:text-white'>
            <p>Conçu par les étudiants pour les étudiants.</p>
          </div>
        </section>
        <section className='relative py-24 sm:py-32 pointer-events-auto'>
          <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
            <div className="aspect-[1097/845] w-[30.5625rem] bg-gradient-to-tr from-[#ff466e] to-[#31aa56] dark:opacity-30 opacity-50" style={{clipPath:" polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
          </div>
          <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
            <div className="aspect-[1097/845] w-[30.5625rem] bg-gradient-to-tr from-[#ff466e] to-[#31aa56] dark:opacity-30 opacity-50" style={{clipPath:" polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
          </div>
          
          <div className="mx-auto max-w-[1340px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Travaillons ensemble</h2>
                <p className="mt-6 text-lg leading-8 dark:text-neutral-300 font-medium">Créer votre compte pour ainsi contribuer au bien-être et au partage de connaissances au sein d&#039;e L'UVSQ</p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col-reverse">
                  <dt className="text-base leading-7 dark:text-gray-300">Documents enregistrés</dt>
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
      <Footer/>
      </>
  );
}
