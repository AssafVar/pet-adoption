import "dotenv/config";
import userMysql from "../data/userMysql.js"

function checkPsw (req, res, next){
    const psw = req.body.userPassword;
    const confirmPsw = req.body.userConfirmPassword;
    if (psw===confirmPsw){
        next() 
    }else{
        res.status(500).send({"err":"Passwords don't match"});
    }
}
async function uniqueEmail(req, res, next){
    userMysql.query("SELECT * FROM users WHERE userEmail=?",[req.body.userEmail],((err,response)=>{
        if (err){
            console.log(err);
        }else if (!response.length){
            next();
        }else{
            res.status(501).send({"err":"email already register"});
        }
    }))
}

export default {checkPsw,uniqueEmail}