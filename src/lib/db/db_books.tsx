import pool from './connection';
import { createClient } from '@/utils/supabase/client';

const cover1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAC6CAYAAAAtd5btAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQzSURBVHgB7dw/aFVnHMfhX4rgoGRrzJCpdhKFdEvBTRCX0iVL7RKkc8kobcdWMqalWy1kqTpkabtIwKHgcDcDFie1S4aoW4hDJpv3FgdLjiQS9XtOngcuN+Rmunzue87752bixa6C9+yDggBCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiHKue29x6UhzM9OSpStO7ENc37tftB3fGz5tbT4uDm56cqoW5y3XpzIVKMdGXf11899Gofv7rF/EdouX5azU7c64SxI+I2zvPa2lteRwih6u9p0Lchzb6fffnD/Xw2ePi8LUPeYroWbMIj47YEFdGN0V4hERemtsleWV0ow6qzQZvXfm1eFV7L9sHO1nkiPi6CNuSw/effVsMS2SIXTPk2ZmzdfXiYp08fqIYlrgQ20J112yuRcgwxYXYNUFpo2Hi1hSHIy7Erp2TlIVX3o64EJMWWXl3HAMjghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIlwrHpme+d5bW497XxtcfWb4lWbW08qXW9CbJGtjG7W6r3fxz93/c36xv2if3oT4uq9P4rhco9IBCESQYhE6N2s+aXZmbN1/vSnNT05VSePnyi63X5wZ/xI1rsQW3hXLy7uhniu2J8+rCT0KsQW4fL8td3nU8Ww9OoecWHusggHqjchttHw0pkLxTD1JsTzp+eK4epNiGbGwxYXouCOprgQ273gXtY3/i6GKy7Ejz/8aM/ft7WwPhxn4s1Ehth1eV5a+7EYpsh7xK5lmjYqLq0td55HpL8iZ83zn3ze+VrbM/3qt6/Hzy7VwxG5xdcmLAtzX4xPZO+lfVWgjYwMR+w6YtvO65q4MDzRC9r/HXCYKoYvOsQ2cbn+5U/2mN+SpM2DiRe7qgfa5GRldKPzq6Qc3K0r12NOM/UmxJfuPhqNHw+fPd59/FMcXBsJ22TwdasT71rvQvy/tqa4vbNd7F/imc7eh8gw+BYfEYRIBCESQYhEECIRhEgEIRJBiEQQIhGESAQhEkGIRBAiEYRIBCESQYhEECIRhEgEIRJBiEQQIhGESAQhEkGIRBAiEYRIBCESQYhEECIRhEgEIRJBiEQQIhGESIR/AeUB4/RuaQogAAAAAElFTkSuQmCC"
const cover2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAC6CAYAAAAtd5btAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARiSURBVHgB7dw/SJRhHMDxn9FUkC6O1s0RVENTQzbWUoGBDWVNURQVREKL55g0FEl/prSloAZddOyEnIz+gLl25ZZDGtha9wgNxl2onPZ93vt+4JY7p+Pr8z5/3vfaftWE9J9tCwnAEIVgiEIwRCEYohAMUQiGKARDFIIhCsEQhWCIQjBEIRiiEAxRCIYoBEMUgiEKwRCFYIhCMEQhGKIQDFEIhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKARDFML2yFx1fiG0PqWuzqDJLsTK9FyMvqhE5c2cEW5QCrHc3xN9vd1B0ZbLTxePTc7EjdujxtdEr8cHovvw3iDAzxEXl5bj1Nm7Ky8jbK7xiZmgQF+aq18X4tS5u/FhthpqvsUfy0GBHhGNsHVgQxwcemmELQR5aU6X5PLQq1ivtBr8/H44tFr6p97I97mVkCNiufbFNZK2HMae3QwVCzLE8cm3dd9PWw0jw5eivX1nqFhwIaYN67RlU8/TB5dDxYQL8WODBUoaDUu7eUdTag5ciGmhUg/lBECbAxciaZNVW8fbwIRgiEIwRCEYohAMUQiGKARDFIIhCsEQhWCIQjBEIRiiEAxRCIYoBEMUgiEKwRCFYIhCMEQhGKIQDFEIhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKARDFIIhCsEQhWCIQjBEIRiiEAxRCIYoBEMUgiEKwRCFYIhCMEQhGKIQDFEIhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKARDFIIhCsEQhWCIQjBEIRiiEAxRCIYoBEMUgiEKwRCFYIhCMEQhGKIQDFEIhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKITtkZnFpeWozn+r/9mPn3H0xGBoterXhaDLJsTvSz9jcOhl3Hs8WQtuue7fpEgr03Oh/GQT4v0nE6Hico4oBEMUgiEKIbtV8x/dh/fGyWOHYs/uzuho3xlqbOR5JUZfTAVZdiGWujrj6fDllRC1NlPTn4IuqxBThK/HB6JUGwVVLFnNEcu3ThthQWUTYhoN+84cCRVTNiGePH4oVFzZhNjRviNUXLgQO3a5FdOKcCE2Wox4M0Ox4ULcv69U9/0UYg63M2ljcCEe2Len4UnJhasPQ8XEmyPWIjzfW3+bJo2KKcZ036GKBblqvnbxeMPPRp5PxcHu/trZacVLdYEgj/jSgqV8qyfKQ6/qfl6dX4jzVx6FigO7jzhQO85L80W1BvSG9soNDl2eLbcCdIhp4fK+cif6ej1j3gykw4O2XzWRgbRISU/xpfmhmuPzu2HM3UzZhPjH2MTMyuvjbDU+zH4JrV8aCQf6e+L6P3Yntlp2If4t7SmmB+u1dsR5d/Yhqhh8ik8IhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKARDFIIhCsEQhWCIQjBEIRiiEAxRCIYoBEMUgiEKwRCFYIhCMEQhGKIQDFEIhigEQxSCIQrBEIVgiEIwRCEYohAMUQiGKITfDI3jMlOiX8IAAAAASUVORK5CYII="
const cover3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAC6CAYAAAAtd5btAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP4SURBVHgB7dzhTSNHAIbhuej+Hx1AB0AHpgOowKYCSsCuAKjApgJDBTYVABXgDnAHG4+jkxIJRwFxl2+W55EGJPsPWl7vzswufOs2CvzP/igQQIhEECIRhEgEIRJBiEQQIhGESAQhEkGIRBAiEYRIBCESQYhEECIRhEgEIRJBiEQQIhGESAQhEkGIRBAiEYRIBCESQYhEECIRhEgEIRJBiEQQIhGESITvpXGr1arwPgcHByVO15jFYtGNRqNuczDrf7o1PjDqsZvNZl2SZkKcz+fi++RRP9Qp4ueI6/W6nJ2dbYfL8Oe6v78vKaLniDW8GuDT01Ph89UPeYroM6IIv47YECeTiQi/kMgQ6yV5PB6X96rbEt1fCzDjb+Mjx/J3iwzx3w7ccDgsd3d3hX6JDHHXam4wGJTN/lf58eNHoV/iQlwulztXc9PptNBPcSE+Pz+/+Xo9G0bemuJTxIW4a9O6hkh/xYWYtMnK7+MxMCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCN9LY9brdVmtVjvfOzk5KfzTruOVpJkQX19fy2QyKdfX19vg3lJfXy6XhfY0E+LNzU2hv8wRiSBEIgiRCM2tmn8aDAbl9PS07O/vl729vcJus9ms3N7elmTNhXhwcFCm0+k2RP6bh4eHkq6pEGuEi8Vi+51+aWqOOB6PRdhTzYRYAxwOh4V+aibEujChv5oJ0cq43+JCFNzXFBfirsWIhxn6LS7Ew8PDN1+vIbbwOBMfExfi0dHRzsvz+fl5oZ8i54ij0ejN9+pZsca463lE2hW5ar64uNj5Xr1venx8vL136lLdI12ozV2Urv54xq8bmytPlyJ2H/Hy8nI7X+RriN7Q9oDD1xEdYl24PD4+usf8i0TdPOgaMZ1Ou83ZsZn5Vwvj5eWlS9FMiD/N5/Nuc4bsNvPHpn7pSWNzJuyurq66JN/ql9KwuqdoX/F9EufdzYdIP/grPiIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIQiSCEIkgRCIIkQhCJIIQiSBEIgiRCEIkghCJIEQiCJEIfwKTSCNxuHTDBQAAAABJRU5ErkJggg=="
let covers = [cover1,cover2,cover3]

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getBooks(genre : string,keywords : string = '',limit: number = 10,excluded_ids: number[] = []) {
    try {
        let query = '';
        let values = [];
        if (keywords === '') {
            query = 'select * from public."Books" where genre=$1 and id != ALL($2) limit $3';
            values = [genre, excluded_ids, limit];
        } else {
            query = 'select * from public."Books" where genre=$1 and id != ALL($2) and title ilike $3 limit $4';
            values = [genre,excluded_ids,'%'+keywords+'%',limit];
        }
        const result = await pool.query(
            query,
            values
        );
        
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}


async function getBook(id: number) {
    try {
        const query = 'select * from public."Books" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows[0]}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function addBook(user_token : any,title: string, author: string, date: string, description: string, ISBN: string, genre: string,image:string) {
    if (user_token === '') {
        return {success:false,message:'Aucun token fourni'};
    }
    console.log(`${API_URL}/api/user/email`);
    const headers1 = new Headers();
    headers1.append('Content-Type', 'application/json');
    headers1.append('email', user_token.user?.email || '');
    const response1 = await fetch(`${API_URL}/api/user/email`,{
        method: 'GET',
        headers: headers1,
    });
    const query_data1 = await response1.json();
    if (response1.status !== 200) {
        return {success:false,message:'Erreur lors de la récupération des données utilisateur'};
    }
    
    if (!query_data1.result.admin) {
        return {success:false,message:' Vous n\'avez pas les droits pour ajouter un livre'};
    }
    
    try {
        const query = 'insert into public."Books" (title, author, date, description,ISBN,genre,image) values ($1, $2, $3, $4 , $5, $6, $7)';
        if (image === '' || image === null || image === undefined) {
            image = covers[Math.floor(Math.random() * covers.length)];
        }
        if (author === '') {
            author = 'Unknown';
        }
        const values = [title, author, date, description, ISBN, genre, image];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Book created'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function updateBook(id: number, title: string, author: string, date: string, description: string, ISBN: string, genre: string,image:string) {
    try {
        const query = 'update public."Books" set title = $1, author = $2, date = $3, description = $4, ISBN = $5, genre = $6 , image = $7 where id = $8';
        const image_64 = Buffer.from(image, 'base64');
        const values = [title, author, date, description, ISBN, genre,image_64, id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Book updated'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function deleteBook(id: number) {
    try {
        const query = 'delete from public."Books" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Book with id '+id+' deleted'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

export { getBooks, getBook, addBook, updateBook , deleteBook };