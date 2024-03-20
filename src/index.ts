// Simple node js app that let you put data into postgress database

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function createUserTable() {
  await client.connect();
  const result = await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

    `);
  //   console.log(result);
  await client.end();
}

// createUserTable();

async function createAddressTable() {
  await client.connect();
  const result = await client.query(`
  CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    street VARCHAR(100) NOT NULL,
    pincode VARCHAR(20), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
  )
  `);
}

createAddressTable();
