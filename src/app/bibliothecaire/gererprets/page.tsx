'use client'
import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const SuiviEmpruntsPage = () => {
    const [emprunts, setEmprunts] = useState([
        { id: 1, livre: 'Introduction à la physique', emprunteur: 'John Doe', dateEmprunt: '2024-05-10', dateRetourPrevue: '2024-06-10', retourne: false },
        { id: 2, livre: 'Architecture des ordinateurs', emprunteur: 'Jane Smith', dateEmprunt: '2024-05-15', dateRetourPrevue: '2024-06-15', retourne: false },
        { id: 3, livre: 'Programmation web', emprunteur: 'Michael Johnson', dateEmprunt: '2024-05-20', dateRetourPrevue: '2024-06-20', retourne: false }
    ]);

    const handleReturn = (id: number) => {
        setEmprunts(emprunts.map(emprunt => emprunt.id === id ? { ...emprunt, retourne: true } : emprunt));
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
                    <h2 className="text-3xl font-semibold mb-6">Suivi des emprunts en cours</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left py-2 px-4">Livre</th>
                                <th className="text-left py-2 px-4">Emprunteur</th>
                                <th className="text-left py-2 px-4">Date d'emprunt</th>
                                <th className="text-left py-2 px-4">Date de retour prévue</th>
                                <th className="text-left py-2 px-4">Statut</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprunts.map(emprunt => (
                                <tr key={emprunt.id} className={emprunt.retourne ? "bg-green-100" : ""}>
                                    <td className="py-2 px-4">{emprunt.livre}</td>
                                    <td className="py-2 px-4">{emprunt.emprunteur}</td>
                                    <td className="py-2 px-4">{emprunt.dateEmprunt}</td>
                                    <td className="py-2 px-4">{emprunt.dateRetourPrevue}</td>
                                    <td className="py-2 px-4">{emprunt.retourne ? 'Retourné' : 'En cours'}</td>
                                    <td className="py-2 px-4">
                                        {!emprunt.retourne && <button onClick={() => handleReturn(emprunt.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Retourner</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SuiviEmpruntsPage;

