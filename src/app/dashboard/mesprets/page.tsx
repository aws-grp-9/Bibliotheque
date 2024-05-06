import React from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { FaBook, FaUser, FaCalendarAlt } from 'react-icons/fa';

const BookLoanPage = () => {
    // Supposons que vous ayez un utilisateur avec ses détails
    const user = {
        name: 'John Doe',
        profile: 'Lecteur',
        branch: 'Informatique',
        year: '3ème année',
    };

    // Supposons que vous ayez une liste de livres prêtés avec leurs détails
    const loanedBooks = [
        {
            id: 1,
            title: 'Introduction à la programmation oriéntée objet',
            loanDate: '2024-05-01',
            returnDate: '2024-05-15',
        },
        {
            id: 2,
            title: 'Bases de données avancées',
            loanDate: '2024-04-25',
            returnDate: '2024-05-10',
        },
        // Ajoutez d'autres livres prêtés ici
    ];

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Informations sur l'utilisateur</h1>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-center mb-2">
                                <FaUser className="mr-2 text-blue-500" />
                                <span className="text-lg font-semibold text-gray-800">{user.name}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2 text-gray-600">Profil:</span>
                                <span className="text-gray-600">{user.profile}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="mr-2 text-gray-600">Filière:</span>
                                <span className="text-gray-600">{user.branch}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-600">Année d'étude:</span>
                                <span className="text-gray-600">{user.year}</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Livres Prêtés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loanedBooks.map((book) => (
                            <div key={book.id} className="bg-white rounded-lg p-6 shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        <FaBook className="mr-2 text-blue-500" />
                                        {book.title}
                                    </h3>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-600" />
                                    <span className="text-gray-600">Date de prêt: {book.loanDate}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <FaCalendarAlt className="mr-2 text-gray-600" />
                                    <span className="text-gray-600">Date limite de remise: {book.returnDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BookLoanPage;
