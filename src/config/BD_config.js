import { config } from "dotenv";
import env from "env-var";

config();

const host = env.get("host").required().asString();
const port = env.get("port").required().asIntPositive();
const user = env.get("user").required().asString();
const password = env.get("password").required().asString();
const database = env.get("database").required().asString();

export default {
    host,
    port,
    user,
    password,
    database
}