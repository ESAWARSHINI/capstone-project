import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import { sequelize } from "./config.js";

import { Access } from "./models/access.js";
import booksRouter from "./routes/books-route.js";
//import moviesRouter from "./routes/movies-route.js";
import usersRouter from "./routes/users-route.js";

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

// cloudinary.config({
//   secure: true,
// });

// console.log(process.env.CLOUDINARY_URL);
// // CLOUDINARY_URL=cloudinary://592113388331896:pZacpSZWFzH7oi-ILHcwGozyiSY@dngylxf2d
// // Log the configuration
// console.log(cloudinary.config());

// /////////////////////////
// // Uploads an image file
// /////////////////////////
// const uploadImage = async (imagePath) => {
//   // Use the uploaded file's name as the asset's public ID and
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

try {
  await sequelize.authenticate();
  await sequelize.sync();

  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// const jane = await Movie.create({
//   name: "Vikram",
//   poster: "https://wallpapercave.com/vikram-movie-kamal-haasan-wallpapers",
//   rating: 10,
//   summary: "good",
//   trailer: "https://www.youtube.com/watch?v=OKBMCL-frPU",
// });

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/books", booksRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
// app.post("/users/pic", upload.single("avatar"), function (req, res, next) {
//   (async () => {
//     // Set the image to upload
//     const imagePath = req.file.path;

//     // Upload the image
//     const publicId = await uploadImage(imagePath);
//     console.log("publicid : " + publicId);
//     res.send({ msg: "uploaded", secure_url: publicId.secure_url });
//   })();

//   console.log("file :" + req.file);
//   console.log(req.body);
// });

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
