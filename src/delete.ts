import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function deleteData(email: string) {
  try {
    await client.connect();
    const query = "DELETE FROM users WHERE email = $1";
    const values = [email];
    const deleted = await client.query(query, values);
    console.log("User deleted successfully");
  } catch (error) {
    console.log("Error while deleting user:", error);
  } finally {
    await client.end();
  }
}

deleteData("test2@gmail.com");
