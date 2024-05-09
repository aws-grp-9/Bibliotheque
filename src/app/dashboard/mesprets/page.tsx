'use client';
import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { createClient } from '@/utils/supabase/client';
import { FaBook, FaUser, FaCalendarAlt , FaCheckCircle, FaExclamationCircle, FaExclamationTriangle } from 'react-icons/fa';
import { AllongementModal } from '@/components/ui/AllongementModal';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const BookLoanPage = () => {

    const [user, setUser] = React.useState<any>({});
    const [loanedBooks, setLoanedBooks] = React.useState<any>([]);
    const [showAllongementModal, setShowAllongementModal] = React.useState<boolean>(false);
    const [selectedLoan, setSelectedLoan] = React.useState<any>({});
    const { toast } = useToast();

    const fetchUserInfos = async () => {
        // fetch user infos
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            console.log('Error while fetching user data');
            return;
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('user_token', JSON.stringify(data));

        const response = await fetch(`${API_URL}/api/user/personnal`, {
            method: 'GET',
            headers: headers,
        });
        const query_data = await response.json();
        if (response.status === 200) {
            setUser(query_data.result);
            console.log(query_data.result);
        } else {
            console.log(query_data.message);
        }
    }

    const fetchLoanedBooks = async () => {
        // fetch loaned books
        // add infos to headers
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            console.log('Error while fetching user data');
            return;
        }
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('user_token', JSON.stringify(data));
        const response = await fetch(`${API_URL}/api/loans/personnal`, {
            method: 'GET',
            headers: headers,
        });
        const query_data = await response.json();
        if (response.status === 200) {
            setLoanedBooks(query_data.result);
        } else {
            console.log(query_data.message);
        }
    }

    const cancelAllongementModal = (showModal: boolean) => {
        setShowAllongementModal(showModal);
        setSelectedLoan({});
        fetchLoanedBooks();
    }
    
    const setError = (message: string) => {
        toast({
            variant:"destructive",
            title:"Erreur",
            description:message,
        });
    }

    const setSuccess = (message: string) => {
        toast({
            title:"Succès",
            description:message,
        });
    }

    React.useEffect(() => {
        fetchUserInfos();
        fetchLoanedBooks();
    } , []);

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen dark:bg-slate-950">
                <div className="container mx-auto px-4 py-8 dark:bg-slate-950">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 dark:text-gray-100">Informations sur l'utilisateur</h1>
                        {user.creation_date && (
                            <div className="bg-white rounded-lg p-6 shadow-md dark:bg-gray-800">
                                <div className="flex items-center mb-2">
                                    <FaUser className="mr-2 text-blue-500" />
                                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.name}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="mr-2 text-gray-600 dark:text-gray-100">Email:</span>
                                    <span className="text-gray-600 dark:text-gray-100">{user.email}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <span className="mr-2 text-gray-600 dark:text-gray-100">Compte crée le:</span>
                                    <span className="text-gray-600 dark:text-gray-100">{new Date(user.creation_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-gray-100">Livres Prêtés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loanedBooks.map((book) => ( 
                        <div key={book.id} className="bg-white rounded-lg p-6 shadow-md dark:bg-gray-800">
                                <div className="grid items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        <FaBook className="mr-2 text-blue-500" />
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-800 font-semibold text-sm dark:text-gray-100">{book.author}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-600 dark:text-gray-100" />
                                    <span className="text-gray-600 dark:text-gray-100">Date de prêt: {new Date(book.start_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaCalendarAlt className="mr-2 text-gray-600 dark:text-gray-100" />
                                    <span className="text-gray-600 dark:text-gray-100">Date limite de remise: {new Date(book.end_date).toLocaleDateString()}</span>
                                </div>
                                             
                            <div className="flex items-center mt-2 justify-between">
                                <div className="flex items-center mt-2">
                                {book.returned ? (
                                    <FaCheckCircle className="mr-2 text-green-500" />
                                ) : new Date(book.end_date) < new Date() ? (
                                    <FaExclamationTriangle className="mr-2 text-red-500" />
                                ) : (
                                    <FaExclamationCircle className="mr-2 text-yellow-500" />
                                )}
                                <span className="text-gray-600 dark:text-gray-100">
                                    {book.returned ? 'Retourné' : new Date(book.end_date) < new Date()? 'En retard' : 'En cours'}
                                </span>
                                </div>
                                {!book.returned && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => {setSelectedLoan(book.id);setShowAllongementModal(!showAllongementModal);}}>Allonger</button>}
                            </div>                                    
                        </div>
                        ))}
                    </div>
                </div>
                
                {showAllongementModal && <AllongementModal cancelAllongementModal={cancelAllongementModal}   choosenLoan={selectedLoan} setErrorMessage={setError} setSuccessMessage={setSuccess}/>}
            </main>
            <Toaster/>
            <Footer />
        </>
    );
};

export default BookLoanPage;
