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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://neerajwdev:SHFZwc53yNOM@ep-spring-firefly-28443111.ap-southeast-1.aws.neon.tech/backendtest?sslmode=require",
});
function updateData(password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "UPDATE users SET password = $1 WHERE email = $2";
            const values = [password, email];
            const updated = yield client.query(query, values);
            console.log("Password updated successfully!");
        }
        catch (error) {
            console.log("Errro while updating password:", error);
        }
        finally {
            yield client.end();
        }
    });
}
updateData("NeerajwD3vGenius", "nbgg@gmail.com");
