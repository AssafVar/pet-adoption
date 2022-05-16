import "dotenv/config";
import userMysql from "../data/userMysql.js";

async function getAllUsers(req, res, next){
        const results = await new Promise ((resolve,reject)=>{
            userMysql.query("SELECT userId, userFirstName, userLastName, userEmail, phoneNumber, bio, role FROM users", (err,response)=>{
                if (err){
                  reject({"err":"No results"});
                    return
                }
                resolve(response);
            })
        });
        req.body = results;
        next();
}
async function getUser(req, res, next){
    const results = await new Promise ((resolve,reject)=>{
        userMysql.query("SELECT userId, userFirstName, userLastName, userEmail, phoneNumber, bio, role FROM users WHERE userId=?",[req.params.id], (err,response)=>{
            if (err){
              reject(err);
                return
            }
            resolve(response);
        })
    });
    req.body = results[0];
    next();
}

export default {getAllUsers,getUser}