import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function updateData(password: string, email: string) {
  try {
    await client.connect();
    const query = "UPDATE users SET password = $1 WHERE email = $2";
    const values = [password, email];
    const updated = await client.query(query, values);
    console.log("Password updated successfully!");
  } catch (error) {
    console.log("Errro while updating password:", error);
  } finally {
    await client.end();
  }
}

updateData("NeerajwD3vGenius", "nbgg@gmail.com");
