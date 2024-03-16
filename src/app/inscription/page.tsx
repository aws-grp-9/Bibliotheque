"use client";
import React from 'react';
import '../style.css';

export default function Inscription(){

    function register() {
        var firstName = (document.getElementById('firstName') as HTMLInputElement).value;
        var lastName = (document.getElementById('lastName') as HTMLInputElement).value;
        var email = (document.getElementById('email') as HTMLInputElement).value;
        var academicYear = (document.getElementById('academicYear') as HTMLInputElement).value;
        var studyYear = (document.getElementById('studyYear') as HTMLInputElement).value;
        var message = document.getElementById('registrationMessage') as HTMLParagraphElement;
    
        
    
        message.style.color = 'green';
        message.textContent = 'Inscription réussie!';
    }
    

    return (
    <div className="container">
    <h1>Inscription</h1>
    <form id="registrationForm">
        <label htmlFor="firstName">Prénom:</label>
        <input type="text" id="firstName" name="firstName" required/>
        
        <label htmlFor="lastName">Nom:</label>
        <input type="text" id="lastName" name="lastName" required/>

        <label htmlFor="email">Adresse e-mail:</label>
        <input type="email" id="email" name="email" required/>

        <label htmlFor="academicYear">Année universitaire:</label>
        <input type="text" id="academicYear" name="academicYear" required/>

        <label htmlFor="studyYear">Année d'étude:</label>
        <select id="studyYear" name="studyYear" required>
            <option value="1">1ère année</option>
            <option value="2">2ème année</option>
            <option value="3">3ème année</option>
            <option value="4">Master 1</option>
            <option value="5">Master 2</option>
        </select>

        <button type="button" onClick={register}>S'inscrire</button>
    </form> 
    <p id="registrationMessage"></p>
    </div>
)
}
