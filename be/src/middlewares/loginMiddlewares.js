import userMysql from "../data/userMysql.js";
import bcrypt from "bcrypt";

async function isEmailMiddleware(req, res, next) {
  const userEmail = req.body.userEmail;

  userMysql.query(
    "SELECT * FROM users WHERE userEmail=?",
    [userEmail],
    (err, response) => {
      if (err) {
        res.send({ err });
      } else if (!response.length) {
        res.status(401).send({"err":"Wrong user email or password"});
      } else {
        req.body.userId = response[0].userId;
        req.body.hashPassword = response[0].password;
        req.body.userFirstName = response[0].userFirstName;
        req.body.userLastName = response[0].userLastName;
        req.body.userPhoneNumber = response[0].phoneNumber;
        req.body.userBio = response[0].bio;
        req.body.role = response[0].role;
        next();
      }
    }
  );
}

async function isPasswordMiddleware(req, res, next) {
  const PasswordCompare = await bcrypt.compare(req.body.userPassword,req.body.hashPassword);
  if (!PasswordCompare) {
    res.status(401).send({"err":"Wrong password"});
  } else {
    next();
  }
}
export default { isEmailMiddleware, isPasswordMiddleware };
