"use strict";
// Join method to query data from to related database
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://neerajwdev:SHFZwc53yNOM@ep-spring-firefly-28443111.ap-southeast-1.aws.neon.tech/backendtest?sslmode=require",
});
function getUserAndAddressUsingJoin(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u 
    JOIN address a ON u.id = user_id
    WHERE u.id = $1
    `;
            const values = [userid];
            const userAndAddress = yield client.query(query, values);
            if (userAndAddress.rows.length > 0) {
                console.log("User&Address", userAndAddress.rows);
                return userAndAddress.rows;
            }
            else {
                console.log("No user or address found with the given ID.");
            }
        }
        catch (error) {
            console.log("Error while fetching user and user Address:", error);
        }
        finally {
            yield client.end();
        }
    });
}
getUserAndAddressUsingJoin("1");
