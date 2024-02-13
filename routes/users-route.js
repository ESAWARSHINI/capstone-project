import express from "express";

const router = express.Router();
import userObject from "../controllers/users-controller.js";
import { auth } from "../middlewares/auth.js";
router
  .route("/")
  .get(auth, userObject.getUsers)
  //Post in Table
  .post(userObject.insertUsers);

router.route("/login").post(userObject.checkUser);

export default router;
