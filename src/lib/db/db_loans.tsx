import pool from './connection';
import {getInfosUser , getInfosFromEmail} from './db_users';
import {getBook} from './db_books';
/* Structure of Loans table: 
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES "User"(id),
    id_book INT REFERENCES "Books"(id),
    start_date DATE,
    end_date DATE,
    returned BOOLEAN
*/

async function getUserLoans(id_user: string) {
    try {
        const query =  'select * from public."Loans" where id_user = $1';
        const values = [id_user];
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

async function getListUsersLoans(limit: string= "10",keywords : string = '',excluded_ids: number[] = []) {
    try {
        let query = '';
        let values = [];
        console.log(keywords);
        if (keywords === ''){
            query =  'select * from public."Loans" and id != ALL($2) limit $1';
            values = [limit,excluded_ids];
        }else {
            query =  'select * from public."Loans" where id != ALL($2) and (id_book in (select id from public."Books" where title ilike $3) or id_user in (select id from public."User" where name ilike $3)) limit $1';
            values = [limit,excluded_ids, '%'+keywords+'%'];
        }

        const result = await pool.query(
            query,
            values
        );
        for (let i = 0; i < result.rows.length; i++) {
            const userInfos = await getInfosUser(result.rows[i].id_user);
            const bookInfos = await getBook(result.rows[i].id_book);
            console.log(userInfos);
            delete userInfos.message.id;
            delete bookInfos.message.id;
            delete userInfos.message.admin;
            result.rows[i] = {...result.rows[i], ...userInfos.message, ...bookInfos.message};
        }
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}


async function addNewLoan(id_user: string, id_book: string,id_library: string, start_date: string, end_date: string) {
    try {
        const query = 'insert into public."Loans" (id_user, id_book, id_library, start_date, end_date) values ($1, $2, $3, $4, $5)';
        const values = [id_user, id_book, id_library, start_date, end_date];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Loan created for user with id '+id_user+" and book with id "+id_book+" from library with id "+id_library}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function returnLoan(id_loan: string, user_token : any) {
    try {
        if (user_token === '') {
            return {success:false,message:'Aucun token fourni'};
        }
        const userInfos = await getInfosFromEmail(user_token.user?.email || '');
        if (userInfos.success === false) {
            return {success:false,message:userInfos.message};
        }
        if (!userInfos.message.admin) {
            return {success:false,message:'User is not an admin'};
        }
        const query = 'update public."Loans" set returned = true where id = $1';
        const values = [id_loan];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Loan with id '+id_loan+' returned'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}



// ajouter liste non retournées, retournées et liste des retards

async function getPendingLoans(id_user: string) {
    try {
        const query =  'select * from public."Loans" where id_user = $1 and returned = false';
        const values = [id_user];
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

async function getListPendingLoans(limit: string= "10",keywords : string = '',excluded_ids: number[] = []) {
    try {
        let query = '';
        let values = [];
        if (keywords === ''){
            query =  'select * from public."Loans" where returned = false and id != ALL($2) limit $1';
            values = [limit,excluded_ids];
        } else {
            query =  'select * from public."Loans" where returned = false and id != ALL($2) and (id_book in (select id from public."Books" where title ilike $3) or id_user in (select id from public."User" where name ilike $3)) limit $1';
            values = [limit,excluded_ids, '%'+keywords+'%'];
        }
        const result = await pool.query(
            query,
            values
        );
        for (let i = 0; i < result.rows.length; i++) {
            const userInfos = await getInfosUser(result.rows[i].id_user);
            const bookInfos = await getBook(result.rows[i].id_book);
            delete userInfos.message.id;
            delete bookInfos.message.id;
            delete userInfos.message.admin;
            result.rows[i] = {...result.rows[i], ...userInfos.message, ...bookInfos.message};
        }
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function getReturnedLoans(id_user: string) {
    try {
        const query =  'select * from public."Loans" where id_user = $1 and returned = true';
        const values = [id_user];
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

async function getListReturnedLoans(limit: string= "10",keywords : string = '',excluded_ids: number[] = []) {
    try {
        let query = '';
        let values = [];
        if (keywords === ''){
            query =  'select * from public."Loans" where returned = true and id != ALL($2) limit $1';
            values = [limit,excluded_ids];
        } else {
            query =  'select * from public."Loans" where returned = true and id != ALL($2) and (id_book in (select id from public."Books" where title ilike $3) or id_user in (select id from public."User" where name ilike $3)) limit $1';
            values = [limit,excluded_ids, '%'+keywords+'%'];
        }
        const result = await pool.query(
            query,
            values
        );
        for (let i = 0; i < result.rows.length; i++) {
            const userInfos = await getInfosUser(result.rows[i].id_user);
            const bookInfos = await getBook(result.rows[i].id_book);
            delete userInfos.message.id;
            delete bookInfos.message.id;
            delete userInfos.message.admin;
            result.rows[i] = {...result.rows[i], ...userInfos.message, ...bookInfos.message};
        }
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function getLateLoans(id_user: string) {
    try {
        const query =  'select * from public."Loans" where id_user = $1 and end_date < current_date  and returned = false';
        const values = [id_user];
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

async function getListLateLoans(limit: string= "10",keywords : string = '',excluded_ids: number[] = []) {
    try {
        let query = '';
        let values = [];
        if (keywords === ''){
            query =  'select * from public."Loans" where end_date < current_date and returned = false and id != ALL($2) limit $1';
            values = [limit,excluded_ids];
        } else {
            query =  'select * from public."Loans" where end_date < current_date and returned = false and id != ALL($2) and (id_book in (select id from public."Books" where title ilike $3) or id_user in (select id from public."User" where name ilike $3)) limit $1';
            values = [limit,excluded_ids, '%'+keywords+'%'];
        }
        const result = await pool.query(
            query,
            values
        );
        for (let i = 0; i < result.rows.length; i++) {
            const userInfos = await getInfosUser(result.rows[i].id_user);
            const bookInfos = await getBook(result.rows[i].id_book);
            delete userInfos.message.id;
            delete bookInfos.message.id;
            delete userInfos.message.admin;
            result.rows[i] = {...result.rows[i], ...userInfos.message, ...bookInfos.message};
        }
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

export { getUserLoans, addNewLoan, returnLoan, getPendingLoans, getReturnedLoans, getLateLoans , getListUsersLoans, getListPendingLoans, getListReturnedLoans, getListLateLoans };