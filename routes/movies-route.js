import express from "express";
import { Movie } from "../models/movies.js";
const router = express.Router();
import totalObject from "../controllers/movies-controller.js";
router
  .route("/")
  // To get the table
  .get(totalObject.getMovies)

  //Post in Table
  .post(totalObject.insertMovies)

  // Update table
  .put(totalObject.updateMovies);

router
  .route("/:id")
  // Find by id
  .get(totalObject.getById)

  //Delete from table
  .delete(totalObject.deleteMovies);

export default router;
