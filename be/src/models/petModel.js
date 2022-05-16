import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import userMysql from "../data/userMysql.js";
import fs from "fs";


async function uploadImage(file){
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try{
    const uploadResult = file && (await cloudinary.uploader.upload(file.path));
    file && uploadResult && fs.promises.unlink(file.path);
    return uploadResult;
  }catch(err){
    console.log(err);
  }
}
function updatePetStatus(req, res, next) {
  const userId = req.body.status==="Available"?null:req.body.userId;
  try {
    userMysql.query(
      `UPDATE pets SET status=?, owner_id=? WHERE pet_id=?`,
      [req.body.status, userId, req.params.id],
      (err, response) => {
        if (response) {
          req.body = ({response:true});
          next()
        } else {
          res.status(500).send({error:"Could update the pet"});
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}
async function getAllUserPets(req, res, next){
  try{
    const userId = req.params.id;
    const results =await new Promise ((resolve,reject)=>{
      userMysql.query(`SELECT * FROM pets WHERE owner_id=?`,[userId],(err,response)=>{
        if (err){
          reject(err);
        }else{
          resolve(response);
        }
      })
    })
    req.body = results;
    next();
  }catch(err){
    res.status(500).send({error:"Could not get the data"});
  }
}

async function updatePet(req, res, next){
  try{
    const response = new Promise ((resolve, reject)=>{
      userMysql.query()
    })
  }catch(err){
    res.status(500).send({error:"Could update the pet"});
  }
}

async function getSearchPets(searchParam){

  const searchValue = [];
  const searchKey = [];
  for (const key in searchParam){
      if (key==="name"&&searchParam[key]!==''){
        searchKey.push(`${key} LIKE '%${searchParam[key]}%'`) 
      }else if  (key==="minHeight"&&searchParam[key]!==''){
        searchKey.push(`height >${searchParam[key]}`)
      }else if  (key==="maxHeight"&&searchParam[key]!==''){
        searchKey.push(`height <${searchParam[key]}`)
      }else if  (key==="minWeight"&&searchParam[key]!==''){
        searchKey.push(`Weight >${searchParam[key]}`)
      }else if  (key==="maxWeight"&&searchParam[key]!==''){
        searchKey.push(`Weight <${searchParam[key]}`)
      }else if  (searchParam[key]){
        searchKey.push(`${key} ='${searchParam[key]}'`)
      }
  }
  let searchKeyString = searchKey.join();
  searchKeyString= searchKeyString.replaceAll(',',' AND ');
  if (searchKeyString){
    searchKeyString = 'WHERE '+searchKeyString;
  };
  return new Promise ((resolve,reject)=>{
      userMysql.query(`SELECT * FROM pets ${searchKeyString}`,(err,response)=>{
          if (err){
            reject({error:"No results"});
              return
          }
          resolve(response);
      })
  })
}
async function addPet(httpMethod, pet) {
  let queryString;
  if (httpMethod==="POST"){
    queryString = "INSERT INTO pets (img_name, img_url, type, height, weight, color, restrictions, breed, name, hypoallergenic ,status, bio, pet_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
  }else{
    queryString = "UPDATE pets SET img_name=?, img_url=?, type=?, height=?, weight=?, color=?, restrictions=?, breed=?, name=?,hypoallergenic=?,status=?,bio=? WHERE pet_id=?" 
  }
  return new Promise((resolve, reject) => {
    userMysql.query(
      queryString,
      [
        pet.image_name,
        pet.image_url,
        pet.type,
        pet.height,
        pet.weight,
        pet.color,
        pet.restrictions,
        pet.breed,
        pet.name,
        pet.hypoallergenic,
        pet.status,
        pet.bio,
        pet.id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
export default { updatePetStatus,getAllUserPets, updatePet, getSearchPets, uploadImage, addPet };
