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
  .post(totalObject.insertBook)

  //update from body
  .put(totalObject.updateBook);

router
  .route("/:id")
  //Delete from users
  .delete(totalObject.deleteBook)

  //Find by id
  .get(totalObject.getBookById);

export default router;
