import pool from './connection';

/* Structure of Loans table: 
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES "User"(id),
    id_book INT REFERENCES "Books"(id),
    start_date DATE,
    end_date DATE,
    returned BOOLEAN
*/

async function getUserLoans(id_user: number) {
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

async function addNewLoan(id_user: number, id_book: number, start_date: string, end_date: string) {
    try {
        const query = 'insert into public."Loans" (id_user, id_book, start_date, end_date) values ($1, $2, $3, $4)';
        const values = [id_user, id_book, start_date, end_date];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Loan created for user with id '+id_user+" and book with id "+id_book}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function returnLoan(id: number) {
    try {
        const query = 'update public."Loans" set returned = true where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Loan with id '+id+' returned'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

// ajouter liste non retournées, retournées et liste des retards

