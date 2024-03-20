import { Client } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function getUsers(email: string) {
  try {
    await client.connect();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const user = await client.query(query, values);
    if (user.rows.length > 0) {
      console.log("user:", user.rows[0]);
      return user.rows[0];
    } else {
      console.log("no user found with the given email");
    }
  } catch (error) {
    console.log("error while getting user:", error);
  } finally {
    await client.end();
  }
}

getUsers("nbgg@gmail.com");
