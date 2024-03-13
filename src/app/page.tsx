"use client";
import React from 'react';
import './style.css';

export default function Connexion(){

    function login() {
        var username = (document.getElementById('username') as HTMLInputElement).value;
        var password = (document.getElementById('password') as HTMLInputElement).value;
        var message = (document.getElementById('loginMessage') as HTMLParagraphElement);
    
        
    
        // Pour cet exemple, nous affichons simplement un message.
        if (username === 'utilisateur' && password === 'motdepasse') {
            message.style.color = 'green';
            message.textContent = 'Connexion réussie!';
        } else {
            message.style.color = 'red';
            message.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
        }
    
    }
    function redirectToInscription() {
        window.location.href = '/inscription';
    }
    return (
        <div className="container">
            <h1>Connexion</h1>
            <form id="loginForm">
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input type="text" id="username" name="username" required/>
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required/>

                <button type="button" onClick={login}>Se connecter</button>
            </form>
            <p id="loginMessage"></p>

            <div className="links">
                <a href="#">Mot de passe oublié ?</a>
                <span>|</span>
                <a href="#" onClick={redirectToInscription}>S'inscrire</a>
            </div>
        </div>
    )
}