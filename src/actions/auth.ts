"use server"
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error: "Informations invalides !"
        }
    }
    const {email, password} = validateFields.data;
    try {
        await signIn("credentials", {
            email, 
            password,
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if(error instanceof AuthError){
            if (error.cause?.err instanceof Error) {
                return {
                    error: error.cause.err.message
                }; // return "custom error"
            }
            switch (error.type) {
                case "CredentialsSignin":
                    return {error:"Invalid Credentials ! "}
                case 'CallbackRouteError':
                    return {error:"Callback Route error !"}
                default:
                    return {error:"Something went wrong !"}
            }
        }
        throw error;
    }
}

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);
    if(!validateFields.success){
        return{
            error:"Informations invalides !"
        }
    }
    const {email, password, name} = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return {
            error: "Cet email est déjà utilisé"
        }
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
    return{
        success:"Votre compte a été créé avec succès, nous vous avons envoyé un email de confirmation."
    }
}