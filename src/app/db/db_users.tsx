import pool from './connection';
import bcrypt from 'bcrypt';


// à tester après la connection avec la DB
async function getUsers(limit : number = 10) { 
    try {
        const query = 'select * from public."users" limit $1';
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

async function createUser(username:string, email: string, firstName: string, lastName: string, birthDate: string, password: string) {
    try {
        const query = 'insert into users (username, email, first_name, last_name, birth_date, password) values ($1, $2, $3, $4, $5, $6)';

        // console.log(email, firstName, lastName, birthDate, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [username, email, firstName, lastName, birthDate, hashedPassword];
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

async function changePassword(id: string, password: string) {
    try {
        const query = 'update users set password = $1 where id = $2';
        const values = [password, id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:"Password for user with "+id+" changed successfully !"}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function deleteUser(id: string) {
    try {
        const query = 'delete from users where id = $1';
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
        const query = 'update users set first_name = $1, last_name = $2, birth_date = $3 email = $4 where id = $5';
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
        const query = 'select * from users where id = $1';
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
        const query = 'select id from users where email = $1';
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
        const query = 'select email from users where id = $1';
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
        const query = 'select username from users where id = $1';
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

async function getPassword(id: string) {
    try {
        const query = 'select password from users where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows[0].password}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}


export { getUsers, createUser , changePassword, deleteUser, updateUser, getIdUser , getEmail, getPassword , getInfosUser};