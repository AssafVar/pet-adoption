import "dotenv/config";
import petModel from "../models/petModel.js";

async function addPet(req, res, next) {
  try {
    const method = req.method;
    req.body.pet = JSON.parse(req.body.petData);
    const image = await petModel.uploadImage(req.file);
    req.body.pet.image_url = image ? image.secure_url : null;
    req.body.pet.image_name = req.file.originalname;
    const newPetImage = await petModel.addPet(method,req.body.pet);
    res.send(newPetImage);
  } catch (err) {
    res.send(err);
  }
}

async function getPets(req,res){
  try{
    const searchParam = JSON.parse(req.headers.search);
    const results = await petModel.getSearchPets(searchParam);
    res.send(results)
  } catch (err){
    res.status(500).send("cannot get pets data")
  }
}

function updatePet(req, res){
  try{
    res.send(req.body);
  }catch(err){
    res.status(500).send("Could not save pet's status");
  }
}
export default { addPet, getPets, updatePet };
