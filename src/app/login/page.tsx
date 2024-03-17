"use client";
import React from 'react';
import '../style.css';
import { login } from '../actions';

export default function Connexion(){

    // function login() {
    //     var username = (document.getElementById('username') as HTMLInputElement).value;
    //     var password = (document.getElementById('password') as HTMLInputElement).value;
    //     var message = (document.getElementById('loginMessage') as HTMLParagraphElement);
    
        
    
    //     // Pour cet exemple, nous affichons simplement un message.
    //     if (username === 'utilisateur' && password === 'motdepasse') {
    //         message.style.color = 'green';
    //         message.textContent = 'Connexion réussie!';
    //     } else {
    //         message.style.color = 'red';
    //         message.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
    //     }
    
    // }
    function redirectToInscription() {
        window.location.href = '/signup';
    }
    return (
        <div className="container">
            
            <form id="loginForm">
            <h1>Connexion</h1>  
                <label htmlFor="email">Email :</label>
                <input type="text" id="email" name="email" required/>
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required/>

                <button formAction={login}>Se connecter</button>
                
            
            <p id="loginMessage"></p>

            <div className="links">
                <a href="#">Mot de passe oublié ?</a>
                <span>|</span>
                <a href="#" onClick={redirectToInscription}>S'inscrire</a>
            </div>
            </form>
        </div>
    )
}