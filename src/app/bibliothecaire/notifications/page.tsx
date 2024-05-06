'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { FaUser, FaEnvelope, FaTrash, FaRegEnvelopeOpen, FaSort, FaSearch } from 'react-icons/fa';

// Définition du type pour les notifications
type Notification = {
    id: number;
    sender: string;
    message: string;
    read: boolean;
    timestamp: Date;
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [notificationsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Simulation de récupération des notifications depuis une API ou une base de données
    useEffect(() => {
        // Ici, vous pouvez ajouter votre logique pour récupérer les notifications depuis l'API ou la base de données
        // Par exemple :
        // fetchNotificationsFromAPI().then((data) => {
        //     setNotifications(data);
        // });
        
        // Pour l'exemple, je simule des notifications pré-existantes
        const sampleNotifications: Notification[] = [
            { id: 1, sender: 'John Doe', message: 'Bonjour, j\'ai une question concernant un livre.', read: false, timestamp: new Date('2024-05-10T08:00:00') },
            { id: 2, sender: 'Jane Smith', message: 'Je souhaite prolonger mon emprunt.', read: true, timestamp: new Date('2024-05-09T10:00:00') },
            // Ajoutez d'autres notifications ici
        ];
        setNotifications(sampleNotifications);
    }, []);

    // Filtrer les notifications en fonction du terme de recherche
    useEffect(() => {
        const filtered = notifications.filter(notification =>
            notification.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotifications(filtered);
    }, [notifications, searchTerm]);

    // Pagination
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Trier les notifications
    const sortedNotifications = currentNotifications.sort((a, b) => sortOrder === 'asc' ? a.timestamp.getTime() - b.timestamp.getTime() : b.timestamp.getTime() - a.timestamp.getTime());

    // Marquer une notification comme lue
    const markAsRead = (id: number) => {
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    // Supprimer une notification
    const deleteNotification = (id: number) => {
        const updatedNotifications = notifications.filter(notification => notification.id !== id);
        setNotifications(updatedNotifications);
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Notifications</h1>
                    <div className="flex justify-end mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher des notifications"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            className="ml-4 px-3 py-2 bg-indigo-500 text-white rounded-lg focus:outline-none"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            <FaSort className="mr-2" />
                            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedNotifications.map((notification) => (
                            <div key={notification.id} className={`bg-white rounded-lg p-4 shadow-md ${notification.read ? 'bg-gray-200' : ''}`}>
                                <div className="flex items-center mb-2">
                                    <FaUser className="mr-2 text-gray-600" />
                                    <span className="text-gray-600">{notification.sender}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-2 text-gray-600" />
                                    <span className="text-gray-600">{notification.message}</span>
                                </div>
                                <div className="flex justify-end mt-2">
                                    {!notification.read && (
                                        <button
                                            className="px-2 py-1 bg-indigo-500 text-white rounded-lg focus:outline-none mr-2"
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <FaRegEnvelopeOpen className="mr-1" />
                                            Marquer comme lu
                                        </button>
                                    )}
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded-lg focus:outline-none"
                                        onClick={() => deleteNotification(notification.id)}
                                    >
                                        <FaTrash className="mr-1" />
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from(Array(Math.ceil(filteredNotifications.length / notificationsPerPage)).keys()).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number + 1)}
                                className={`mx-1 px-3 py-1 bg-white border border-gray-300 rounded-lg focus:outline-none ${currentPage === number + 1 ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default NotificationsPage;

