import { Book } from "../models/books.js";
import { Op } from "sequelize";

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

async function searchBookFunction(search) {
  const obj = await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
        { genre: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { rating: { [Op.like]: `%${search}%` } },
      ],
    },
  });
}

export default {
  getAllBooksFunction,
  insertBookFunction,
  updateBookFunction,
  deleteBookFunction,
  getBookByIdFunction,
  searchBookFunction,
};
