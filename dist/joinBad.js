"use strict";
// Join we use where we want data from to realted table here in our case it is -> user & address table
// Ugly way to do that i mean wihtout using join
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
});
function getUserDetailsAndAddressSeparately(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // Fetch user details
            const userQuery = "SELECT * FROM users WHERE id = $1";
            const values = [userid];
            const userResults = yield client.query(userQuery, values);
            // Fetch User address
            const userAddressQuery = "SELECT city, country, street, pincode FROM address WHERE user_id = $1";
            const userAddressResults = yield client.query(userAddressQuery, [userid]);
            console.log(userResults.rows.length > 0 ? userResults.rows[0] : "No user found");
            console.log(userAddressResults.rows.length > 0
                ? userAddressResults.rows
                : "You have no address");
            return { user: userResults.rows[0], address: userAddressResults.rows };
        }
        catch (error) {
            console.error("Error during fetching user and address:", error);
        }
        finally {
            yield client.end();
        }
    });
}
getUserDetailsAndAddressSeparately("1");
