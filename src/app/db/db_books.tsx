import pool from './connection';


async function getBooks(limit: number = 10,keywords : string = '') {
    try {
        let query = '';
        let values = [];
        if (keywords === '') {
            query = 'select * from public."Books" limit $1';
            values = [limit];
        } else {
            query = 'select * from public."Books" where title like $1 or author like $1 or genre like $1 limit $2';
            values = ['%'+keywords+'%',limit];
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

async function addBook(title: string, author: string, date: string, description: string, ISBN: string, genre: string) {
    try {
        const query = 'insert into public."Books" (title, author_id, date, description,ISBN,genre) values ($1, $2, $3, $4 , $5, $6)';
        const values = [title, author, date, description, ISBN, genre];
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

async function updateBook(id: number, title: string, author: string, date: string, description: string, ISBN: string, genre: string) {
    try {
        const query = 'update public."Books" set title = $1, author = $2, date = $3, description = $4, ISBN = $5, genre = $6 where id = $7';
        const values = [title, author, date, description, ISBN, genre, id];
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