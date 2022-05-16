import express from "express";
import schemaValidation from "../middlewares/schemaValidation.js";
import signupController from "../controllers/signupController.js";
import isTable from "../middlewares/isTable.js";
import signupMiddlewares from "../middlewares/signupMiddlewares.js";
import tokenMiddlewares from "../middlewares/tokenMiddlewares.js";
import loginMiddlewares from "../middlewares/loginMiddlewares.js";
import userController from "../controllers/userController.js"

const router = express.Router();

router
  .route("/signup")
  .post(
    schemaValidation.signupValidation,
    isTable.isUserTable,
    signupMiddlewares.checkPsw,
    signupMiddlewares.uniqueEmail,
    signupController.addUser,
    tokenMiddlewares.createToken,
    userController.sendUser,
  );
router
  .route("/login")
  .post(
    schemaValidation.loginValidation,
    loginMiddlewares.isEmailMiddleware,
    loginMiddlewares.isPasswordMiddleware,
    tokenMiddlewares.createToken,
    userController.sendUser,
  );

  export default router;
