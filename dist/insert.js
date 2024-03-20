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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
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
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = yield client.query(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    `, [username, email, password]);
            console.log("User created successfully");
        }
        catch (error) {
            console.log("error while inserting data", error);
        }
        finally {
            yield client.end();
        }
    });
}
insertData("testuser2", "test2@gmail.com", "testTwo123");
