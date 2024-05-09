import Link from 'next/link';
import Navbar from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import React from 'react';

export default function UserProfile() {
    // Supposons que vous avez les détails de l'utilisateur dans un état
    const userDetails = {
        firstName: 'John',
        lastName: 'Doe',
        birthYear: 1990,
        studyLevel: 'Graduate',
        articlesRead: 50,
        articlesDownloaded: 20,
        userType: 'Reader', // Vous pouvez également utiliser "Librarian" si c'est un bibliothécaire
    };

    return (
        <>
            <Navbar />
            <main className="max-w-[1340px] mx-auto px-2  dark:bg-green-600">
                <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-green-200 dark:bg-green-600 shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Prénom</h3>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-600">
                            <dl>
                                <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{userDetails.firstName}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-600 shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Nom de famille</h3>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-600">
                            <dl>
                                <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{userDetails.lastName}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-600 shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Année de naissance</h3>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-600">
                            <dl>
                                <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{userDetails.birthYear}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-600 shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Niveau d'études</h3>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-600">
                            <dl>
                                <div className="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{userDetails.studyLevel}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <Link href="/page.tsx">
                        <Button variant="sky" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit ">Retour à l'Accueil</Button>
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}
