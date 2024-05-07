'use client'
import React, { useState } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';



const SuiviEmpruntsPage = () => {
    const [emprunts, setEmprunts] = useState<any>([]);
    const [keywords, setKeywords] = useState<string>('');
    const [loanType, setLoanType] = useState<string>('all');
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleReturn = (id: number) => {
        setEmprunts(emprunts.map((emprunt: any) => emprunt.id === id ? { ...emprunt, retourne: true } : emprunt));
    };

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
    };

    const fetchLoans = async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('LoanType', loanType);
        headers.append('keywords', keywords);
        const response = await fetch(`${API_URL}/api/loans`,{
            method: 'GET',
            headers: headers,
        });
        const query_data = await response.json();
        if (response.status === 200) {
            console.log(query_data.result);
            setEmprunts(query_data.result);
        }

    }
    
    const fetchMore = async (keywords:string='') => {
        // fetch more loans
        // add infos to headers
        const headers = new Headers();
        const fetchMoreButton = document.getElementById('fetchMoreButton');
        const excluded_ids = emprunts.map((emprunt: any) => emprunt.id);
        console.log('Excluded ids:', excluded_ids);
        headers.append('excluded_ids', JSON.stringify(excluded_ids));
        headers.append('keywords', keywords);
        headers.append('LoanType', loanType);
        const request = new Request(`${API_URL}/api/loans`, {
          method: 'GET',
          headers: headers,
        });
        const response = await fetch(request);
        const data = await response.json();
        if (data.result === undefined || data.result.length === 0) {
          console.log('No loan found');
          // hide the button
          if (!fetchMoreButton!.classList.contains('hidden')) {
            fetchMoreButton!.classList.add('hidden');
          }
        } else {
          fetchMoreButton!.classList.remove('hidden');
          // add new loans to the list
            setEmprunts([...emprunts, ...data.result]);
        }
      }

    const returnLoan = async (id: string) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${API_URL}/api/loans/${id}`,{
            method: 'PATCH',
            headers: headers,
            body : JSON.stringify({user_token : data}),
        });
        const query_data = await response.json();
        if (response.status === 200) {
            console.log(query_data.result);
            setEmprunts(emprunts.map((emprunt: any) => emprunt.id === id ? { ...emprunt, returned: true } : emprunt));
        }
    }


    React.useEffect(() => {
        checkAdmin();
        fetchLoans();
    } , []);

    React.useEffect(() => {
        const fetchMoreButton = document.getElementById('fetchMoreButton');
        fetchMoreButton!.classList.remove('hidden');
        fetchLoans();
    } , [loanType, keywords]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen grid justify-center content-center items-center w-svw">
                <div className="p-8 rounded-lg shadow-lg dark:bg-gray-800 bg-white">
                    <h2 className="text-3xl font-semibold mb-6">Suivi des emprunts</h2>
                    <div className="flex justify-between mb-4">
                        <div>
                            <label htmlFor="loanType" className="mr-2">Type de prêt:</label>
                            <select id="loanType" value={loanType} onChange={(e) => setLoanType(e.target.value)} className='rounded-md bg-gray-100 dark:bg-gray-900'>
                                <option value="all">Tous</option>
                                <option value="returned">Retournés</option>
                                <option value="pending">En cours</option>
                                <option value="late">En retard</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="keywords" className="mr-2">Mots-clés:</label>
                            <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} className='rounded-md bg-gray-100 dark:bg-gray-900 h-6'/>
                        </div>
                    </div>
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-900">
                                <th className="text-left py-2 px-4">Livre</th>
                                <th className="text-left py-2 px-4">Emprunteur</th>
                                <th className="text-left py-2 px-4">Date d'emprunt</th>
                                <th className="text-left py-2 px-4">Date de retour prévue</th>
                                <th className="text-left py-2 px-4">Statut</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprunts.map((emprunt: any) => {
                                const isReturned = emprunt.returned;
                                const isPastDue = !isReturned && new Date(emprunt.end_date) < new Date();
                                const statusClassName = isReturned ? "bg-green-100 dark:bg-green-900" : isPastDue ? "bg-red-100 dark:bg-red-900" : "";
                                const statusText = isReturned ? 'Retourné' : isPastDue ? 'En retard' : 'En cours';
                                return (
                                    <tr key={emprunt.id} className={statusClassName}>
                                        <td className="py-2 px-4 w-80">{emprunt.title}</td>
                                        <td className="py-2 px-4 w-48">{emprunt.name}</td>
                                        <td className="py-2 px-4">{new Date(emprunt.start_date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{new Date(emprunt.end_date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{statusText}</td>
                                        <td className="py-2 px-4">
                                            {!isReturned && <button onClick={() => returnLoan(emprunt.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Retourner</button>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid justify-center hidden" id='fetchMoreButton'>
                    <Button onClick={() => fetchMore(keywords)} variant="secondary" size={"lg"} className="active:scale-95 transition focus:outline focus:outline-gray-300 font-medium w-full sm:w-fit bg-green-300 hover:bg-green-600 text-white align-middle my-6">Voir plus</Button>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SuiviEmpruntsPage;

