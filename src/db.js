import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import env from "env-var";

import DB from "./config/BD_config.js"

//config();
/*
console.log("host:", env.get("host").required().asString());
console.log("port:", env.get("port").required().asIntPositive());
console.log("user:", env.get("user").required().asString());
console.log("password:", env.get("password").required().asString());
console.log("database:", env.get("database").required().asString());
*/


/*
const pool = createPool({
    host: "127.0.0.1", //string
    port: 3306, //numero
    user: "root", //string
    password: "66138627", //string
    database: "restaurant_frijolito" //string
})
*/
const pool = createPool({
    host: DB.host,
    port: DB.port,
    user: DB.user,
    password: DB.password,
    database: DB.database
});
export default pool;