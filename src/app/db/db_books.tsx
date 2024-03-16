import pool from './connection';


async function getBooks(limit: number = 10) {
    try {
        const query = 'select * from books limit $1';
        const values = [limit];
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
        const query = 'select * from books where id = $1';
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

async function addBook(title: string, author: string, date: string, description: string) {
    try {
        const query = 'insert into books (title, author, date, description) values ($1, $2, $3, $4)';
        const values = [title, author, date, description];
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

async function updateBook(id: number, title: string, author: string, date: string, description: string) {
    try {
        const query = 'update books set title = $1, author = $2, date = $3, description = $4 where id = $5';
        const values = [title, author, date, description, id];
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
        const query = 'delete from books where id = $1';
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