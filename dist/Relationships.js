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
function relationship() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const added = yield client.query(`
    INSERT INTO address (user_id, city, country, street, pincode)
    VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');
    `);
            console.log("Address added successfully!");
        }
        catch (error) {
            console.log("Error while adding address", error);
        }
        finally {
            yield client.end();
        }
    });
}
relationship();
