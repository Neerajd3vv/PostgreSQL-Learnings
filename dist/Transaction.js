"use strict";
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
// Tranaction in node application
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({ connectionString: process.env.DATABASE_URL });
function createUserAndAddresses(username, email, password, city, country, pincode, street) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // start transaction
            yield client.query("BEGIN");
            // User insert
            const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
            const values = [username, email, password];
            const user = yield client.query(query, values);
            const userId = user.rows[0].id;
            // Insert address using the returned user ID
            const queryTwo = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
            const valuesTwo = [userId, city, country, street, pincode];
            yield client.query(queryTwo, valuesTwo);
            // end transaction
            yield client.query("COMMIT");
            console.log("Created successfully!");
        }
        catch (error) {
            yield client.query("ROLLBACK");
            console.error("Error during transaction, rolled back.", error);
            throw error;
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
createUserAndAddresses("Goku", "goku@test.com", "123goku", "mumbai", "India", "kanchan", "12344");
