'use client'
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Button } from "@/components/ui/button";
import { FaNewspaper } from 'react-icons/fa'; 

const AjouterArticlePage = () => {
    const [titre, setTitre] = React.useState('');
    const [contenu, setContenu] = React.useState('');
    const [date, setDate] = React.useState('');
    const [image, setImage] = React.useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImage(file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logique pour envoyer les données de l'article au serveur
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl text-blue-500 font-semibold mb-6">Ajouter un article</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" id="titre" name="titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">Contenu</label>
                            <textarea id="contenu" name="contenu" value={contenu} onChange={(e) => setContenu(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" rows={8} required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <Button type="submit" variant="success" size="lg" className="flex items-center justify-center space-x-2 py-3 px-6 text-center">
                            <FaNewspaper className="text-2xl animate-bounce" />
                            <span>Ajouter l'article</span>
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AjouterArticlePage;
