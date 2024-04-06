import { db } from "@/lib/db";

export const getUserByEmail = async(email:string)=>{
    return db.user.findUnique({
        where:{
            email
        }
    })
}

export const getUserById = async(id:string)=>{
    return db.user.findUnique({
        where:{
            id
        }
    })
}