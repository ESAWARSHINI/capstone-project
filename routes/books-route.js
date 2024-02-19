import express from "express";
const router = express.Router();
import { Book } from "../models/books.js"; // not used as we are creating controller
import totalObject from "../controllers/books-controller.js";
import { auth } from "../middlewares/auth.js";
router
  .route("/")
  // To get the table
  .get(auth, totalObject.getAllBooks)

  //post in table
  .post(auth, totalObject.insertBook)

  //update from body
  .put(auth, totalObject.updateBook);

router
  .route("/:id")
  //Delete from users
  .delete(auth, totalObject.deleteBook)

  //Find by id
  .get(auth, totalObject.getBookById);

router.route("/search").get(totalObject.searchBook);

export default router;
