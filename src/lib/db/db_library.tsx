import pool from './connection';


/*
    Structure of LibraryStock table: 
    id_library SERIAL PRIMARY KEY,
    id_book INT REFERENCES "Books"(id),
    quantity INT
    Structure of Physical Library table:
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
    address VARCHAR(255)
*/

// Physical Library table functions
async function getLibraries() {
    try {
        const query = 'select * from public."Physical Library"';
        const result = await pool.query(
            query
        );
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function getLibraryInfos(id_library: string) {
    try {
        const query = 'select * from public."Physical Library" where id = $1';
        const values = [id_library];
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

async function addLibrary(name: string, address: string) {
    try {
        const query = 'insert into public."Physical Library" (name, address) values ($1, $2)';
        const values = [name, address];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Library created'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function deleteLibrary(id: string) {
    try {
        const query = 'delete from public."Physical Library" where id = $1';
        const values = [id];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Library deleted'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

// LibraryStock table functions

async function getLibraryBooks(id_library: string) {
    try {
        const query = 'select * from public."LibraryStock" where id_library = $1';
        const values = [id_library];
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

async function addBookToLibrary(id_book: string, id_library: string, quantity: number) {
    try {
        const query = 'insert into public."LibraryStock" (id_library, id_book, quantity) values ($1, $2, $3)';
        const values = [id_library, id_book, quantity];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Book added to library'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function deleteBookFromLibrary(id_book: string, id_library: string) {
    try {
        const query = 'delete from public."LibraryStock" where id_book = $1 and id_library = $2';
        const values = [id_book, id_library];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:'Book deleted from library'}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function checkBookQuantity(id_book: string, id_library: string) {
    try {
        const query = 'select quantity from public."LibraryStock" where id_book = $1 and id_library = $2';

        const values = [id_book, id_library];
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

// La mise à jour des quantités sur emprunt se fait par trigger sur la table Loans (voir Supabase)

export { getLibraries, getLibraryBooks, addBookToLibrary, deleteBookFromLibrary, checkBookQuantity, getLibraryInfos , addLibrary , deleteLibrary };