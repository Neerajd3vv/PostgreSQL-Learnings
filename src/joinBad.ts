// Join we use where we want data from to realted table here in our case it is -> user & address table
// Ugly way to do that i mean wihtout using join

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function getUserDetailsAndAddressSeparately(userid: string) {
  try {
    await client.connect();
    // Fetch user details
    const userQuery = "SELECT * FROM users WHERE id = $1";
    const values = [userid];
    const userResults = await client.query(userQuery, values);
    // Fetch User address
    const userAddressQuery =
      "SELECT city, country, street, pincode FROM address WHERE user_id = $1";
    const userAddressResults = await client.query(userAddressQuery, [userid]);
    console.log(
      userResults.rows.length > 0 ? userResults.rows[0] : "No user found"
    );
    console.log(
      userAddressResults.rows.length > 0
        ? userAddressResults.rows
        : "You have no address"
    );
    return { user: userResults.rows[0], address: userAddressResults.rows };
  } catch (error) {
    console.error("Error during fetching user and address:", error);
  } finally {
    await client.end();
  }
}

getUserDetailsAndAddressSeparately("1");
