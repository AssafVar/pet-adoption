import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

async function createToken(req, res, next) {
const hashedPassword = await bcrypt.hash(req.body.userPassword,7);
  const user = {
    userEmail: req.body.userEmail,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userPhoneNumber: req.body.userPhoneNumber,
    userBio: req.body.userBio,
    userId: req.body.userId,
    role: req.body.role,
  };
  jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "5h" },
    (err, token) => {
      req.body.user = ({ token ,user});
      next();
    }
  );
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send({"err":"not valid token"});
    } else {
      next();
    }
  });
}
export default { createToken, verifyToken };
