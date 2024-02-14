import { Book } from "../models/books.js"; // not used when service is created
import bookService from "../services/books-service.js";
async function getAllBooks(request, response) {
  var querys = request.query;
  const page = querys?.page || 1;
  const limit = querys?.limit || 5;
  let dbQuery = {};
  // console.log(querys);
  if (querys.orderBy && querys.order) {
    dbQuery.order = [[querys.orderBy, querys.order]];
  }
  if ("page" in querys || "limit" in querys) {
    dbQuery.offset = (page - 1) * limit;
    dbQuery.limit = limit;
  }
  // findAll({}) -> return all books
  response.send(await bookService.getAllBooksFunction(dbQuery));
}

async function insertBook(request, response) {
  console.log(request.body);
  const { title, author, genre, description, rating } = request.body;
  response.send(
    await bookService.insertBookFunction(
      title,
      author,
      genre,
      description,
      rating
    )
  );
}

async function updateBook(request, response) {
  console.log(request.body);
  const { title } = request.body;
  const NOT_FOUND_MSG = { msg: "book not found" };
  const obj = await bookService.updateBookFunction(title);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
}

async function deleteBook(request, response) {
  console.log(request.params);
  const { id } = request.params;
  const NOT_FOUND_MSG = { msg: "book not found" };
  const obj = await bookService.deleteBookFunction(id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send("deleted") : response.status(404).send(NOT_FOUND_MSG);
}

async function getBookById(request, response) {
  console.log(request.params);
  const { id } = request.params;
  const NOT_FOUND_MSG = { msg: "book not found" };
  const obj = await bookService.getBookByIdFunction(id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
}

export default { getAllBooks, insertBook, updateBook, deleteBook, getBookById };
