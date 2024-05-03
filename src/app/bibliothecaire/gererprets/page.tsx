'use client'
import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    role: string;
}

const GestionUtilisateursPage = () => {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([
        { id: 1, nom: 'John Doe', email: 'john@example.com', role: 'Bibliothécaire' },
        { id: 2, nom: 'Jane Smith', email: 'jane@example.com', role: 'Étudiant' },
        { id: 3, nom: 'Michael Johnson', email: 'michael@example.com', role: 'Professeur' }
    ]);

    const handleDelete = (id: number) => {
        setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== id));
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-6">Gestion des utilisateurs</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left py-2 px-4">Nom</th>
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Rôle</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilisateurs.map(utilisateur => (
                                <tr key={utilisateur.id}>
                                    <td className="py-2 px-4">{utilisateur.nom}</td>
                                    <td className="py-2 px-4">{utilisateur.email}</td>
                                    <td className="py-2 px-4">{utilisateur.role}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleDelete(utilisateur.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Supprimer</button>
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

export default GestionUtilisateursPage;

