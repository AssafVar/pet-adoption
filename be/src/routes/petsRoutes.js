import express from "express";
import petController from "../controllers/petController.js";
import multer from "multer";
import petModel from "../models/petModel.js";
import userController from "../controllers/userController.js"
import tokenMiddlewares from "../middlewares/tokenMiddlewares.js";
import schemaValidation from "../middlewares/schemaValidation.js";
import isTable from "../middlewares/isTable.js";
const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

router
  .route("/")
  .get(petController.getPets)
  .post(
    tokenMiddlewares.verifyToken,
    isTable.isPetTable,
    upload.single("image"),
    schemaValidation.petValidation,
    petController.addPet,
  );
  
router
  .route("/:id/")
  .post(tokenMiddlewares.verifyToken,petModel.updatePetStatus, petController.updatePet)
  .put(tokenMiddlewares.verifyToken, upload.single("image"),schemaValidation.petValidation, petController.addPet);
router
  .route("/user/:id/")
  .get(tokenMiddlewares.verifyToken, petModel.getAllUserPets, userController.getUsers);

export default router;
