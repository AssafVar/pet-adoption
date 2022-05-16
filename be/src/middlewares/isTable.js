import "dotenv/config";
import userMysql from "../data/userMysql.js";

function isUserTable(req, res, next) {
  const sql =
    "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(80) PRIMARY KEY NOT NULL, userFirstName VARCHAR(45) NOT NULL, userLastName VARCHAR(45) NOT NULL, password VARCHAR(100) NOT NULL, userEmail VARCHAR(45) NOT NULL, phoneNumber INT(11) NOT NULL, bio VARCHAR(500), role VARCHAR(45)) ";
  userMysql.query(sql, function (err, result) {
    if (err) throw err;
  });
  next();
}
function isPetTable(req, res, next) {
  const sql =
    "CREATE TABLE IF NOT EXISTS pets (pet_id VARCHAR(45) PRIMARY KEY NOT NULL, img_name VARCHAR(45) NOT NULL, img_url VARCHAR(200) NOT NULL, type VARCHAR(45) NOT NULL, height VARCHAR(45) NOT NULL, weight VARCHAR(45) NOT NULL, color VARCHAR(45) NOT NULL, restrictions VARCHAR(45) NOT NULL, status VARCHAR(45) NOT NULL, bio VARCHAR(500), owner_id VARCHAR(100)) ";
  userMysql.query(sql, function (err, result) {
    if (err) throw err;
  });
  next();
}

export default { isUserTable, isPetTable };
