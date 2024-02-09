import { Movie } from "../movies.js";

async function getFunction() {
  return await Movie.findAll({
    attributes: ["name", "poster", "rating", "summary", "trailer", "createdAt"],
  });
}

async function insertFunction(name, poster, rating, summary, trailer) {
  return await Movie.create({ name, poster, rating, summary, trailer });
}

async function updateFunction(name) {
  return await Movie.update(
    { name },
    {
      where: {
        name: "Vikram",
      },
    }
  );
}

async function getByIdFunction(id) {
  return await Movie.findOne({
    where: {
      id: id,
    },
  });
}

async function deleteFunction(id) {
  return await Movie.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  getFunction,
  insertFunction,
  updateFunction,
  getByIdFunction,
  deleteFunction,
};
