'use client'
import { signOut } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Dashboard() {
    const handleSignOut = async () => {
        await signOut().then(() => {
            window.location.href = '/'; // Redirection vers la page d'accueil après la déconnexion
        });
    };

    return (
        <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">Merci de votre visite. À bientôt !</p>
            <form onSubmit={handleSignOut}>
                <Button type="submit" variant="success">Se déconnecter</Button>
            </form>
        </div>
    );
}
