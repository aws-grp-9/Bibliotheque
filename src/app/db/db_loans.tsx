import pool from './connection';

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

async function returnLoan(id_user: string, id_loan : string) {
    try {
        const query = 'update public."Loans" set returned = true where id_user = $1 and id = $2';
        const values = [id_user , id_loan];
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

async function getLateLoans(id_user: string) {
    try {
        const query =  'select * from public."Loans" where id_user = $1 and end_date < current_date and returned = false';
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

export { getUserLoans, addNewLoan, returnLoan, getPendingLoans, getReturnedLoans, getLateLoans }