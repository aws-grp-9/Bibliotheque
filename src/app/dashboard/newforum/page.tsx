import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa';

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <section className="bg-white shadow-md rounded-lg">
                    <div className="max-w-4xl mx-auto p-8">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Nous Contacter</h1>
                        <p className="text-gray-600 mb-8">N'hésitez pas à nous contacter si vous avez des questions, des suggestions ou des commentaires. Remplissez simplement le formulaire ci-dessous et nous vous répondrons dès que possible.</p>
                        <form className="space-y-6">
                            <div className="flex items-center">
                                <FaUser className="text-gray-500 mr-3" />
                                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nom complet</label>
                            </div>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Entrez votre nom complet"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="flex items-center">
                                <FaEnvelope className="text-gray-500 mr-3" />
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse e-mail</label>
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Entrez votre adresse e-mail"
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                            <div className="flex items-center">
                                <FaComment className="text-gray-500 mr-3" />
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                            </div>
                            <textarea
                                id="message"
                                placeholder="Entrez votre message ici"
                                rows={5}
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            ></textarea>
                            <div className="flex justify-end">
                                <Button variant="sky">Envoyer</Button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
