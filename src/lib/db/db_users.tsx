import pool from './connection';

// à tester après la connection avec la DB
async function getUsers(limit : number = 10) { 
    try {
        const query = 'select * from public."User" limit $1';
        const values = [limit];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message: result.rows};
    } catch ( error:any ) {
        console.log( error );
        return {success:false,message :error.detail};
    }
}

async function getInfosFromEmail(email: string) {
    try {
        const query = 'select * from public."User" where email = $1';
        const values = [email];
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

async function createUser(creation_date:string, email: string, name:string) {
    try {
        const query = 'insert into public."User" (creation_date, email, name) values ($1, $2, $3)';

        // console.log(email, firstName, lastName, birthDate);
        const values = [creation_date,email,name]
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:"User with email "+email+" created successfully !"};
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

// async function changePassword(id: string, password: string) {
//     try {
//         const query = 'update users set password = $1 where id = $2';
//         const values = [password, id];
//         const result = await pool.query(
//             query,
//             values
//         );
//         return {success:true,message:"Password for user with "+id+" changed successfully !"}
//     } catch ( error: any ) {
//         console.log( error );
//         return {success:false,message:error.detail};
//     }
// }

async function deleteUser(id: string) {
    try {
        const query = 'delete from public."User" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:"User with "+id+" deleted successfully !"}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function updateUser(id:string, email: string, firstName: string, lastName: string, birthDate: string) {
    try {
        const query = 'update public."User" set first_name = $1, last_name = $2, birth_date = $3 email = $4 where id = $5';
        const values = [firstName, lastName, birthDate, email, id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:"User with "+id+" updated successfully !"}
    } catch ( error: any ) {
        console.log( error );
        return  {success:false,message:error.detail};
    }
}

async function getInfosUser(id: string) {
    try {
        const query = 'select * from public."User" where id = $1';
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


async function getIdUser(email: string) {
    try {
        const query = 'select id from public."User" where email = $1';
        const values = [email];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows[0].id}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function getEmail(id: number) {
    try {
        const query = 'select email from public."User" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows[0].email}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function getUsername(id: number) {
    try {
        const query = 'select username from public."User" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows[0].username}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

// async function getPassword(id: string) {
//     try {
//         const query = 'select password from public."User" where id = $1';
//         const values = [id];
//         const result = await pool.query(
//             query,
//             values
//         );
//         return {success:true,message:result.rows[0].password}
//     } catch ( error: any ) {
//         console.log( error );
//         return {success:false,message:error.detail};
//     }
// }


export { getUsers, createUser , deleteUser, updateUser, getIdUser , getEmail , getInfosUser, getUsername, getInfosFromEmail};