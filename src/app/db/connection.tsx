const Pool = require("pg").Pool;
const pool = new Pool({
  user: "norras",
  host: "localhost",
  database: "bib",
  password: "admin",
  port: 5432,
});

// have to find a way to execute this only once when the server starts
pool.query(
  `CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year INT,
    genre VARCHAR(255)
  )`
);
pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birth_date DATE,
    password VARCHAR(255)
  )`
);


export default pool;