import pool from './connection';



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

async function addBook(title: string, author: string, date: string, description: string, ISBN: string, genre: string,image:string) {
    try {
        const query = 'insert into public."Books" (title, author, date, description,ISBN,genre,image) values ($1, $2, $3, $4 , $5, $6, $7)';
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