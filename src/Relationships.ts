import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function relationship() {
  try {
    await client.connect();

    const added = await client.query(`
    INSERT INTO address (user_id, city, country, street, pincode)
    VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');
    `);
    console.log("Address added successfully!");
  } catch (error) {
    console.log("Error while adding address", error);
  } finally {
    await client.end();
  }
}
relationship();
