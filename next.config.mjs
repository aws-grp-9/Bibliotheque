/** @type {import('next').NextConfig} */
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const nextConfig = {
    reactStrictMode: true,
};



export default (phase, { defaultConfig }) => {
    const { Pool } = pkg;
    const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
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

