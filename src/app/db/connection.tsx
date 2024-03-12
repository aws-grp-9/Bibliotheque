const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bib",
  password: "admin",
  port: 5432,
});



export default pool;