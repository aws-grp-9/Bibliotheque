"use server"
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);
    const supabase = createClient();
    if(!validateFields.success){
        return{
            error: "Informations invalides !"
        }
    }
    const { email, password } = validateFields.data;
    try {
        const response = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (response.error) {
            return {
                error: response.error.message
            };
        }
        
    } catch (error) {
        return {
            error : "Erreur lors de la connexion. Vérifiez vos informations."
        };
    }
    redirect("/");
}

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error:"Informations invalides !"
        }
    }
    const {email, password, name } = validateFields.data;
    const supabase = createClient();
    const { error } = await supabase.auth.signUp(data);
    // Ici rajouter l'envoi des infos autres que email/password à la base de données.
    // fetch vers /api/user avec les infos
    const body = {
        creation_date : new Date(),
        email : email,
        name : name,
    }

    console.log(error);
    if(error){
        return {
            error: "Erreur avec la création du compte. Vérifiez vos informations."
        }
    }
    const request = new Request('http://localhost:3000/api/user', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await fetch(request);
    const request_data = await response.json();
    console.log(request_data.success);
    return{
        success:"Votre compte a été créé avec succès, nous vous avons envoyé un email de confirmation."
    }
}

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
}

export const auth = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if(error){
        return{
            error: "Erreur lors de la récupération de vos informations."
        }
    }
    // Faire une requête à la base de données pour récupérer les infos de l'utilisateur
    return {
        email : data?.user.email
    };
}