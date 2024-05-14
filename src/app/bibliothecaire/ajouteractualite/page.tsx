'use client'
import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Button } from "@/components/ui/button";
import { FaNewspaper } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation';

const AjouterActualitePage = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
        const formData = new FormData();
        formData.append('title', titre);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de l\'ajout de l\'actualité.');
            }

            router.push('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    } catch (error) {
        // Gestion de l'erreur ici
    }
};


    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center" style={{backgroundImage: `url("/biblio3.jpg")`}}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl text-blue-500 font-semibold mb-6">Ajouter une actualité</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" id="titre" name="titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" rows={4} required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                            <input type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <Button type="submit" variant="success" size="lg" className="flex items-center justify-center space-x-2 py-3 px-6 text-center" disabled={loading}>
                            {loading ? (
                                <span>En cours...</span>
                            ) : (
                                <>
                                    <FaNewspaper className="text-2xl animate-bounce" />
                                    <span>Ajouter l'actualité</span>
                                </>
                            )}
                        </Button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AjouterActualitePage;
