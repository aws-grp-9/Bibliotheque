'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { AiOutlineDelete } from 'react-icons/ai';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const GestionUtilisateursPage = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const checkAdmin = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            router.push('/');
            return;
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
            return;
        }
        if (!query_data1.result.admin) {
            router.push('/');
            return;
        }
    }


    React.useEffect(() => {
        checkAdmin();
    } , []);
    // État local pour stocker la liste des utilisateurs
    const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
    
    // État local pour gérer les filtres de recherche
    const [filtres, setFiltres] = useState({ nom: '', role: '' });
    
    // État local pour gérer la pagination
    const [pagination, setPagination] = useState({ page: 1, nombreParPage: 10 });
    
    // État local pour gérer le tri
    const [tri, setTri] = useState<{ colonne: string | null, ordre: string }>({ colonne: null, ordre: 'asc' });

    // Fonction pour charger les utilisateurs depuis la base de données
    const chargerUtilisateurs = async () => {
        // Ici, vous pouvez appeler votre fonction pour récupérer les utilisateurs depuis la base de données
        // Assurez-vous d'ajuster cette fonction en fonction de votre backend
        // Par exemple :
        // const utilisateursData = await getUsers();
        // setUtilisateurs(utilisateursData);
        // Remarque : pour le moment, nous utilisons des données fictives
        const utilisateursData = [
            { id: 1, nom: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { id: 2, nom: 'Jane Smith', email: 'jane@example.com', role: 'Utilisateur' },
            { id: 3, nom: 'Michael Johnson', email: 'michael@example.com', role: 'Modérateur' }
        ];
        setUtilisateurs(utilisateursData);
    };

    // Charger les utilisateurs au chargement de la page
    useEffect(() => {
        chargerUtilisateurs();
    }, []);

    // Fonction pour supprimer un utilisateur
    const handleDeleteUser = (id: number) => {
        // Filtrer les utilisateurs pour obtenir ceux dont l'ID est différent de celui spécifié
        const nouveauxUtilisateurs = utilisateurs.filter((utilisateur) => utilisateur.id !== id);
        // Mettre à jour la liste des utilisateurs
        setUtilisateurs(nouveauxUtilisateurs);
    };

    // Fonction pour changer de page
    const handleChangePage = (nouvellePage: number) => {
        setPagination({ ...pagination, page: nouvellePage });
    };

    // Fonction pour changer le nombre d'utilisateurs par page
    const changerNombreParPage = (nombre: number) => {
        setPagination({ ...pagination, nombreParPage: nombre });
    };

    // Fonction pour trier les utilisateurs
    const trierUtilisateurs = (colonne: string) => {
        if (tri.colonne === colonne) {
            // Inverser l'ordre de tri s'il s'agit de la même colonne
            setTri({ colonne, ordre: tri.ordre === 'asc' ? 'desc' : 'asc' });
        } else {
            // Trier par la nouvelle colonne par défaut
            setTri({ colonne, ordre: 'asc' });
        }
    };

    // Fonction pour filtrer par nom
    const filtrerParNom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltres({ ...filtres, nom: e.target.value });
    };

    // Fonction pour filtrer par rôle
    const filtrerParRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltres({ ...filtres, role: e.target.value });
    };

    // Filtrer les utilisateurs en fonction des filtres actifs
    const utilisateursFiltres = utilisateurs.filter((utilisateur) =>
        utilisateur.nom.toLowerCase().includes(filtres.nom.toLowerCase()) &&
        (filtres.role === '' || utilisateur.role === filtres.role)
    );

    // Trier les utilisateurs
    const utilisateursTries = utilisateursFiltres.sort((a, b) => {
        if (tri.colonne) {
            if (tri.ordre === 'asc') {
                return a[tri.colonne] > b[tri.colonne] ? 1 : -1;
            } else {
                return a[tri.colonne] < b[tri.colonne] ? 1 : -1;
            }
        }
        return 0;
    });

    // Pagination
    const startIndex = (pagination.page - 1) * pagination.nombreParPage;
    const utilisateursPage = utilisateursTries.slice(startIndex, startIndex + pagination.nombreParPage);

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-3/4 xl:w-2/3">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Gestion des utilisateurs</h2>
    
                    {/* Filtrage */}
                    <div className="flex flex-col lg:flex-row items-center mb-4">
                        <input type="text" placeholder="Filtrer par nom" value={filtres.nom} onChange={filtrerParNom} className="border rounded mr-2 mb-2 lg:mb-0 px-2 py-1 w-full lg:w-auto" />
                        <select value={filtres.role} onChange={filtrerParRole} className="border rounded px-2 py-1 w-full lg:w-auto">
                            <option value="">Filtrer par rôle</option>
                            {/* Options pour les rôles */}
                        </select>
                    </div>
    
                    {/* Tableau */}
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th onClick={() => trierUtilisateurs('nom')} className="cursor-pointer py-2 px-4 text-left">Nom</th>
                                <th onClick={() => trierUtilisateurs('email')} className="cursor-pointer py-2 px-4 text-left">Email</th>
                                <th onClick={() => trierUtilisateurs('role')} className="cursor-pointer py-2 px-4 text-left">Rôle</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Lignes du tableau */}
                            {utilisateursPage.map((utilisateur) => (
                                <tr key={utilisateur.id} className="border-b">
                                    <td className="py-2 px-4">{utilisateur.nom}</td>
                                    <td className="py-2 px-4">{utilisateur.email}</td>
                                    <td className="py-2 px-4">{utilisateur.role}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleDeleteUser(utilisateur.id)} className="text-red-500 hover:text-red-700" title="Supprimer"><AiOutlineDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <span className="mr-2">Nombre par page :</span>
                            <button onClick={() => changerNombreParPage(10)} className={`border rounded px-2 py-1 ${pagination.nombreParPage === 10 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>10</button>
                            <button onClick={() => changerNombreParPage(20)} className={`border rounded px-2 py-1 ${pagination.nombreParPage === 20 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>20</button>
                            <button onClick={() => changerNombreParPage(50)} className={`border rounded px-2 py-1 ${pagination.nombreParPage === 50 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>50</button>
                        </div>
                        <div>
                            {/* Pagination */}
                            {utilisateursTries.length > pagination.nombreParPage && (
                                <div className="flex items-center">
                                    <button onClick={() => handleChangePage(pagination.page - 1)} disabled={pagination.page === 1} className={`border rounded-l px-4 py-2 ${pagination.page === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>Précédent</button>
                                    <button onClick={() => handleChangePage(pagination.page + 1)} disabled={pagination.page === Math.ceil(utilisateursTries.length / pagination.nombreParPage)} className={`border rounded-r px-4 py-2 ml-1 ${pagination.page === Math.ceil(utilisateursTries.length / pagination.nombreParPage) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>Suivant</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default GestionUtilisateursPage;
