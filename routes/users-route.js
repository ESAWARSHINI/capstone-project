import express from "express";

const router = express.Router();
import userObject from "../controllers/users-controller.js";
import { auth } from "../middlewares/auth.js";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Return "https" URLs by setting secure: true

const upload = multer({ storage });

router
  .route("/")
  .get(userObject.getUsers)
  //Post in Table
  .post(userObject.insertUsers);

router.route("/login").post(userObject.checkUser);
router.route("/profile").post(auth, userObject.updateProfile);
router.route("/logout").post(auth, userObject.logoutProfile);
router.route("/:id").delete(auth, userObject.deleteProfile);
router.route("/pic").post(upload.single("avatar"), userObject.userPic);
export default router;
