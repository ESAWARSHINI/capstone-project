import { Book } from "../models/books.js";

async function getAllBooksFunction(dbQuery) {
  return await Book.findAll(dbQuery);
}

async function insertBookFunction(title, author, genre, description, rating) {
  return await Book.create({ title, author, genre, description, rating });
}

async function updateBookFunction(author, id) {
  return await Book.update(
    { author },
    {
      where: {
        id: id,
      },
    }
  );
}

async function deleteBookFunction(id) {
  return await Book.destroy({
    where: {
      id: id,
    },
  });
}

async function getBookByIdFunction(id) {
  return await Book.findOne({
    where: {
      id: id,
    },
  });
}

export default {
  getAllBooksFunction,
  insertBookFunction,
  updateBookFunction,
  deleteBookFunction,
  getBookByIdFunction,
};
