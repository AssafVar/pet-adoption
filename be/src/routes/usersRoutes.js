import express from "express";
import userProfile from "../middlewares/userProfile.js";
import profileControler from "../controllers/profileControler.js";
import userModel from "../models/userModel.js";
import userController from "../controllers/userController.js"
import tokenMiddlewares from "../middlewares/tokenMiddlewares.js";
import schemaValidation from "../middlewares/schemaValidation.js";


const router = express.Router();

router
  .route("/")
  .get(tokenMiddlewares.verifyToken,
    userModel.getAllUsers,
    userController.getUsers)

router
  .route("/:id/")
  .get(
    tokenMiddlewares.verifyToken,
      userModel.getUser,
      userController.getUser
  )
  .put(
    tokenMiddlewares.verifyToken,
    schemaValidation.signupValidation,
    userProfile.modifyProfile,
    profileControler.updateProfile
    );

export default router;

