'use client'
// AjouterLivrePage.tsx
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const AjouterLivrePage = () => {
    const [titre, setTitre] = React.useState('');
    const [auteur, setAuteur] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [annee, setAnnee] = React.useState('');
    const [matiere, setMatiere] = React.useState('');
    const [image, setImage] = React.useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImage(file);
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl text-blue-500 font-semibold mb-6">Ajouter un livre</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" id="titre" name="titre" value={titre} onChange={(e) => setTitre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="auteur" className="block text-sm font-medium text-gray-700">Auteur</label>
                            <input type="text" id="auteur" name="auteur" value={auteur} onChange={(e) => setAuteur(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                            <input type="text" id="genre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="annee" className="block text-sm font-medium text-gray-700">Année</label>
                            <input type="text" id="annee" name="annee" value={annee} onChange={(e) => setAnnee(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="matiere" className="block text-sm font-medium text-gray-700">Matière</label>
                            <input type="text" id="matiere" name="matiere" value={matiere} onChange={(e) => setMatiere(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter le livre</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AjouterLivrePage;
