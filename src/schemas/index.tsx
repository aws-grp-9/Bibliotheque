import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message:"Adresse email obligatoire !"
    }),
    password: z.string().min(1,{
        message: "Mot de passe obligatoire ! "
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message:"Veuillez entrer votre nom! "
    }),
    email: z.string().email({
        message:"Adresse email obligatoire!"
    }),
    password: z.string().min(6,{
        message: "Votre mot de passe doit avoir minimum 6 caractères ! "
    }),
    numEtu: z.string().min(8,{
        message: "Votre numéro étudiant doit avoir minimum 8 caractères ! "
    })
})