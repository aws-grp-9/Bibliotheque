import pool from './connection';


// à tester après la connection avec la DB
async function getUsers(limit : number = 10) { 
try {
    const query = 'select * from users limit $1'
    const values = [limit]
    const result = await pool.query(
        query,
        values
    );
    return result.rows;
  } catch ( error ) {
      console.log( error );
  }
}