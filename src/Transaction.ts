// Tranaction in node application
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function createUserAndAddresses(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  pincode: string,
  street: string
) {
  try {
    await client.connect();
    // start transaction
    await client.query("BEGIN");
    // User insert
    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
    const values = [username, email, password];
    const user = await client.query(query, values);
    const userId = user.rows[0].id;
    // Insert address using the returned user ID
    const queryTwo =
      "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
    const valuesTwo = [userId, city, country, street, pincode];
    await client.query(queryTwo, valuesTwo);

    // end transaction
    await client.query("COMMIT");
    console.log("Created successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during transaction, rolled back.", error);
    throw error;
  } finally {
    await client.end(); // Close the client connection
  }
}

createUserAndAddresses(
  "Goku",
  "goku@test.com",
  "123goku",
  "mumbai",
  "India",
  "kanchan",
  "12344"
);
