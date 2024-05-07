'use client'
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Button } from "@/components/ui/button";
import { FaNewspaper } from 'react-icons/fa'; 
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AjouterActualitePage = () => {
    const [titre, setTitre] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState('');
    const [image, setImage] = React.useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setImage(file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logique pour envoyer les données de l'actualité au serveur
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const checkAdmin = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            router.push('/');
        }
        const headers1 = new Headers();
        headers1.append('Content-Type', 'application/json');
        headers1.append('email', data?.user?.email || '');
        const response1 = await fetch(`${API_URL}/api/user/email`,{
            method: 'GET',
            headers: headers1,
        });
        const query_data1 = await response1.json();
        if (response1.status !== 200) {
            router.push('/');
        }
        if (!query_data1.result.admin) {
            router.push('/');
        }
    }


    React.useEffect(() => {
        checkAdmin();
    } , []);

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center">
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
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
                        </div>
                        <Button type="submit" variant="success" size="lg" className="flex items-center justify-center space-x-2 py-3 px-6 text-center">
                            <FaNewspaper className="text-2xl animate-bounce" />
                            <span>Ajouter l'actualité</span>
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AjouterActualitePage;
