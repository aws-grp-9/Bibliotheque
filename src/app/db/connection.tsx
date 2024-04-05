require("dotenv").config();


const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL, 
  ssl: {
    rejectUnauthorized: false,
  },
});


export default pool;