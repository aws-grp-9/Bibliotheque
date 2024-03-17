"use client";
import React from 'react';
import '../style.css';
import { signup } from '../actions';

export default function Inscription(){


    

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

        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required/>

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

        <button formAction={signup}>S'inscrire</button>
    </form> 
    <p id="registrationMessage"></p>
    </div>
)
}
