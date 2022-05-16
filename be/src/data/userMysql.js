import "dotenv/config";
import mysql from "mysql2";

const DB_USER = process.env.DB_USER;
const DB_HOST= process.env.DB_HOST;
const DB_PASSWORD= process.env.DB_PASSWORD;
const DB_DATABASE= process.env.DB_DATABASE;
const userDB = mysql.createConnection({user:DB_USER,host:DB_HOST,password:DB_PASSWORD,database:DB_DATABASE});

export default userDB;