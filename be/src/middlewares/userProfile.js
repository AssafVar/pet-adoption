import userMysql from "../data/userMysql.js";
import bcrypt from "bcrypt";


async function modifyProfile(req, res, next) {
  const user = req.body;
  user.userPassword = await bcrypt.hash(req.body.userPassword,7);
  const userId = req.params.id;
  try {
    const result = userMysql.query(
      "UPDATE users SET userFirstName=?, userLastName=?, password=?, userEmail=?, phoneNumber =?, bio=?  WHERE userId = ?",
      [user.userFirstName, user.userLastName,user.userPassword, user.userEmail, user.userPhoneNumber, user.userBio, userId],
      (err, response) => {
        if (err) {
          return("Could not update the profile")
        } else {
          return response;
        }
      }
    );
    if (result?.err){
      res.status(500).send(result.err)
    }else{
      next();
    }
  } catch (err) {}
}

export default { modifyProfile };
