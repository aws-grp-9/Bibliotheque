'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { AiOutlineDelete } from 'react-icons/ai';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { BannissementModal } from '@/components/ui/BannissementModal';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";


const GestionUtilisateursPage = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const { toast } = useToast();

    const checkAdmin = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            router.push('/');
            return;
        }
        const headers1 = new Headers();
        headers1.append('Content-Type', 'application/json');
        headers1.append('user_token',  JSON.stringify(data));
        const response1 = await fetch(`${API_URL}/api/user/personnal`,{
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
    };



    // État local pour stocker la liste des utilisateurs
    const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
    // État local pour gérer la pagination
    const [pagination, setPagination] = useState(10);
    // État local pour gérer le tri
    const [tri, setTri] = useState<{ colonne: string | null, ordre: string }>({ colonne: null, ordre: 'asc' });
    const [keyword, setKeyword] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>({});
    const [showBannissementModal, setShowBannissementModal] = useState(false);

    // Fonction pour charger les utilisateurs depuis la base de données
    const chargerUtilisateurs = async (keywords : string = '') => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            return;
        }
        setUtilisateurs([]);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('user_token',  JSON.stringify(data));
        headers.append('numberUsers', pagination.toString());
        headers.append('keywords' , keywords);
        // add to excluded_ids the ids of the users in utilisateurs
        const response = await fetch(`${API_URL}/api/user`,{
            method: 'GET',
            headers: headers,
        });
        const query_data = await response.json();
        if (response.status !== 200) {
            console.log(query_data);
            return;
        }
        const button = document.getElementById('fetchMoreButton');
        if (button) {
            button.classList.remove('hidden');
        }
        setUtilisateurs(query_data.result);
    };

    const chargerPlusUtilisateurs = async ( keywords : string = '') => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('user_token',  JSON.stringify(data));
        headers.append('numberUsers', pagination.toString());
        headers.append('keywords' , keywords);
        // add to excluded_ids the ids of the users in utilisateurs
        headers.append('excluded_ids', JSON.stringify(utilisateurs.map((utilisateur) => utilisateur.id)));
        const response = await fetch(`${API_URL}/api/user`,{
            method: 'GET',
            headers: headers,
        });
        const query_data = await response.json();
        if (response.status !== 200) {
            console.log(query_data);
            return;
        }
        if (query_data.result.length === 0) {
            // get button and hide it
            const button = document.getElementById('fetchMoreButton');
            if (button) {
                button.classList.add('hidden');
            }
        }
        setUtilisateurs([...utilisateurs, ...query_data.result]);
    }


    // Fonction pour supprimer un utilisateur
    const handleDeleteUser = (id: number) => {
        // Filtrer les utilisateurs pour obtenir ceux dont l'ID est différent de celui spécifié
        const nouveauxUtilisateurs = utilisateurs.filter((utilisateur) => utilisateur.id !== id);
        // Mettre à jour la liste des utilisateurs
        setUtilisateurs(nouveauxUtilisateurs);
    };


    // Fonction pour trier les utilisateurs
    const trierUtilisateurs = (colonne: string) => {
        // Si la colonne est déjà triée, inverser l'ordre
        if (tri.colonne === colonne) {
            setTri({
                colonne,
                ordre: tri.ordre === 'asc' ? 'desc' : 'asc'
            });
        } else {
            setTri({
                colonne,
                ordre: 'asc'
            });
        }
    };

    // Trier les utilisateurs
    const utilisateursTries = utilisateurs.sort((a, b) => {
        if (tri.colonne) {
            if (tri.ordre === 'asc') {
                return a[tri.colonne] > b[tri.colonne] ? 1 : -1;
            } else {
                return a[tri.colonne] < b[tri.colonne] ? 1 : -1;
            }
        }
        return 0;
    });

    const cancelBannissementModal = (showModal: boolean) => {
        setShowBannissementModal(showModal);
        setSelectedUser({});
        chargerUtilisateurs();
    }

    const setErrorMessage = (message: string) => {
        toast({
            variant:"destructive",
            title:"Erreur",
            description:message,
        });
    }

    const setSuccessMessage = (message: string) => {
        toast({
            title:"Succès",
            description:message,
        });
    }

    // Charger les utilisateurs au chargement de la page
    React.useEffect(() => {
        checkAdmin();
        chargerUtilisateurs();
    }, []);
    
    React.useEffect(() => {
        chargerUtilisateurs(keyword);
    }, [keyword]);

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-slate-950">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-3/4 xl:w-2/3 dark:bg-slate-900">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Gestion des utilisateurs</h2>
    
                    {/* Filtrage */}
                    <div className="flex flex-col lg:flex-row items-center mb-4 ">
                        <input type="text" placeholder="Filtrer" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="border rounded mr-2 mb-2 lg:mb-0 px-2 py-1 w-full lg:w-auto dark:border" />
                    </div>
    
                    {/* Tableau */}
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-800">
                                <th onClick={() => trierUtilisateurs('name')} className="cursor-pointer py-2 px-4 text-left">Nom</th>
                                <th onClick={() => trierUtilisateurs('email')} className="cursor-pointer py-2 px-4 text-left">Email</th>
                                <th onClick={() => trierUtilisateurs('admin')} className="cursor-pointer py-2 px-4 text-left">Administrateur</th>
                                <th onClick={() => trierUtilisateurs('banned')} className="cursor-pointer py-2 px-4 text-left">Banni</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Lignes du tableau */}
                            {utilisateursTries.map((utilisateur) => (
                                <tr key={utilisateur.id} className="border-b dark:border-gray-700">
                                    <td className="py-2 px-4">{utilisateur.name}</td>
                                    <td className="py-2 px-4">{utilisateur.email}</td>
                                    <td className="py-2 px-4">{utilisateur.admin? "Oui" : "Non"}</td>
                                    <td className="py-2 px-4">{utilisateur.banned ? "Oui" : "Non"} </td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => {setSelectedUser(utilisateur);setShowBannissementModal(!showBannissementModal);}} className="text-red-500 hover:text-red-700" title="Supprimer"><AiOutlineDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <span className="mr-2">Charger par :</span>
                            <button onClick={() => setPagination(10)} className={`border rounded px-2 py-1 ${pagination === 10 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-slate-800 dark:border-none'}`}>10</button>
                            <button onClick={() => setPagination(20)} className={`border rounded px-2 py-1 ${pagination === 20 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-slate-800 dark:border-none'}`}>20</button>
                            <button onClick={() => setPagination(50)} className={`border rounded px-2 py-1 ${pagination === 50 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-slate-800 dark:border-none'}`}>50</button>
                        </div>
                        <button id='fetchMoreButton' onClick={() => chargerPlusUtilisateurs()} className="border rounded px-2 py-1 bg-blue-500 text-white dark:border-none">Charger plus</button>
                    </div>
                </div>
            </main>
            { showBannissementModal && <BannissementModal cancelBannissementModal={cancelBannissementModal} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} choosenUser = {selectedUser} />}
            <Toaster />
            <Footer />
        </>
    );
};

export default GestionUtilisateursPage;
