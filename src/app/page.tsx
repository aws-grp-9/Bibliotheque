"use client"

import React from 'react';
import './style.css';
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export default function Home(){
    const [style , setStyle] = React.useState({
        color: 'black'
    })

    const checksession = async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
            setStyle({color: 'red'});
            const home_div = document.getElementById('home') as HTMLDivElement;
            if ( !document.getElementById('home_a') ) {
                var home_a = document.createElement('a');
                home_a.id = 'home_a';
                home_a.textContent = 'Connectez-vous';
                home_a.href = '/login';
                home_div.appendChild(home_a);
            }
        }
    }

    React.useEffect(() => {
        checksession()
    }, [])

    return (
        <div id="home">
            <h1>Home</h1>
            <p style={style}>Bienvenue sur notre site!</p>
        </div>
    )
}