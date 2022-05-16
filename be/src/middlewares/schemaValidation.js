import Ajv from "ajv";
import signupSchema from "../data/signupSchema.js";
import loginSchema from "../data/loginSchema.js";
import petSchema from "../data/petSchema.js";
import addFormats from "ajv-formats"
import fs from "fs";

const ajv = new Ajv();
addFormats(ajv);
function signupValidation(req, res, next) {
  const validate = ajv.compile(signupSchema);
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send({err:"Missing required fields"});
  }
}
function loginValidation(req, res, next) {
  const validate = ajv.compile(loginSchema);
  const valid = validate(req.body);
  if (valid) {
    next();
  } else {
    res.status(400).send({err:"Missing required fields"});
  }
}
function petValidation(req, res, next) {
  let toValidate;
  if (req.body.petData){
    toValidate = JSON.parse(req.body.petData)
  }else{
    toValidate = JSON.parse(req.body);
  }
  const validate = ajv.compile(petSchema);
  const valid = validate(toValidate);
  if (valid) {
    next();
  } else {
    req.file &&fs.promises.unlink(req.file.path);
    res.status(400).send({err:"Missing required fields"});
  }
}
export default {signupValidation,loginValidation,petValidation};
