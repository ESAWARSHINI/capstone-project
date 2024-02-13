import express from "express";
import cors from "cors";
import { sequelize } from "./config.js";
import { Movie } from "./models/movies.js";
import moviesRouter from "./routes/movies-route.js";
import usersRouter from "./routes/users-route.js";
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
app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
