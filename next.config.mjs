/** @type {import('next').NextConfig} */
import pkg from 'pg';

const nextConfig = {
    reactStrictMode: true,
};



export default (phase, { defaultConfig }) => {
    const { Pool } = pkg;
    const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bib",
    password: "admin",
    port: 5432,
    });


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
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birth_date DATE,
        password VARCHAR(255)
    )`
    );

    return nextConfig;
}

