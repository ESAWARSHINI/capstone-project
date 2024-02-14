import express from "express";

const router = express.Router();
import userObject from "../controllers/users-controller.js";
import { auth } from "../middlewares/auth.js";

router
  .route("/")
  .get(userObject.getUsers)
  //Post in Table
  .post(userObject.insertUsers);

router.route("/login").post(userObject.checkUser);
router.route("/profile").post(userObject.updateProfile);
router.route("/logout").post(userObject.logoutProfile);

export default router;
