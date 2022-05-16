import "dotenv/config"
import bcrypt from "bcrypt";
import userMysql from "../data/userMysql.js";

async function addUser(req, res, next) {
  let role;
  userMysql.query(("SELECT * FROM users"),(err,res)=>{
    res.length?role="user":role="Admin";
  })
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 7);
  const userFirstName = req.body.userFirstName;
  const userLastName = req.body.userLastName;
  const userEmail = req.body.userEmail;
  const userPhoneNumber = req.body.userPhoneNumber;
  const userId = req.body.userId;
  userMysql.query(
    "INSERT INTO users (userId, userFirstName, userLastName, userEmail, phoneNumber, password, role) VALUES (?,?,?,?,?,?,?)",
    [userId, userFirstName, userLastName, userEmail, userPhoneNumber, hashedPassword,role],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        req.body.password = hashedPassword;
        next();
      }
    }
  )
}


export default {addUser};