import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// This is not safe as , we can become vicitim of very popular attack called "SQL INJECTION" , we dont want backend(express) to put  whatever user sending into postgress db ,

// async function addUsers() {
//   try {
//     await client.connect();
//     const insertQuery = await client.query(`
//     INSERT INTO users (username , email, password)
//     VALUES ('Sumit' , 'sumi@gmail.com' , 'neerajkabeta')
//     `);
//     console.log("User added successfully");
//   } catch (err) {
//     console.log("error while insertion of data", err);
//   } finally {
//     await client.end();
//   }
// }

// addUsers();

// +++++++++++++++++++++++++++++++ BETTER WAY +++++++++++++++++++++++++++++++
// Add/Insert data
async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect();
    const insertQuery = await client.query(
      `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    `,
      [username, email, password]
    );

    console.log("User created successfully");
  } catch (error) {
    console.log("error while inserting data", error);
  } finally {
    await client.end();
  }
}

insertData("testuser2", "test2@gmail.com", "testTwo123");
