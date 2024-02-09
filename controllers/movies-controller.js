import { Movie } from "../movies.js";
import movieService from "../services/movies-service.js";
async function getMovies(request, response) {
  // "/" ---> API endpoint
  response.send(await movieService.getFunction());
}

async function insertMovies(request, response) {
  console.log(request.body);
  const { name, poster, rating, summary, trailer } = request.body;
  response.send(
    await movieService.insertFunction(name, poster, rating, summary, trailer)
  );
}

async function updateMovies(request, response) {
  console.log(request.body);
  const { name } = request.body;
  const NOT_FOUND_MSG = { msg: "user not found" };
  const obj = await movieService.updateFunction(name);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
}

async function getById(request, response) {
  console.log(request.params);
  const { id } = request.params;
  const NOT_FOUND_MSG = { msg: "user not found" };
  const obj = await movieService.getByIdFunction(id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
}

async function deleteMovies(request, response) {
  console.log(request.params);
  const { id } = request.params;
  const NOT_FOUND_MSG = { msg: "user not found" };
  const obj = await movieService.deleteFunction(id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send("deleted") : response.status(404).send(NOT_FOUND_MSG);
}
export default { getMovies, insertMovies, updateMovies, getById, deleteMovies };
