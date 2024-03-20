// Join method to query data from to related database

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  connectionString:
  process.env.DATABASE_URL,
});

async function getUserAndAddressUsingJoin(userid: string) {
  try {
    await client.connect();
    const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u 
    JOIN address a ON u.id = user_id
    WHERE u.id = $1
    `;
    const values = [userid];
    const userAndAddress = await client.query(query, values);
    if (userAndAddress.rows.length > 0) {
      console.log("User&Address", userAndAddress.rows);
      return userAndAddress.rows;
    } else {
      console.log("No user or address found with the given ID.");
    }
  } catch (error) {
    console.log("Error while fetching user and user Address:", error);
  } finally {
    await client.end();
  }
}

getUserAndAddressUsingJoin("1");
