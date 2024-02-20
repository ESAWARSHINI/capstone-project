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
  if ("search" in querys) {
    const NOT_FOUND_MSG = { msg: "book not found" };

    response.send(await bookService.searchBookFunction(querys.search));
    return;
    //response.send(obj ? obj : NOT_FOUND_MSG);
    // console.log(dbQuery);
    // obj[0] >= 1 ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
  }
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

  const { author, id } = request.body;
  const NOT_FOUND_MSG = { msg: "book not found" };
  const obj = await bookService.updateBookFunction(author, id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  console.log(obj);
  obj[0] >= 1
    ? response.send({ msg: "updated" })
    : response.status(404).send(NOT_FOUND_MSG);
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
  console.log("inside getid ctrl");
  console.log(request.params);
  const { id } = request.params;
  const NOT_FOUND_MSG = { msg: "book not found" };
  const obj = await bookService.getBookByIdFunction(id);
  //response.send(obj ? obj : NOT_FOUND_MSG);
  obj ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
}

// async function searchBook(request, response) {
//   console.log(request.query);

//   const { search } = request.query;
//   const NOT_FOUND_MSG = { msg: "book not found" };
//   const obj = await bookService.searchBookFunction(search);
//   //response.send(obj ? obj : NOT_FOUND_MSG);
//   console.log(obj);
//   obj[0] >= 1 ? response.send(obj) : response.status(404).send(NOT_FOUND_MSG);
// }

export default {
  getAllBooks,
  insertBook,
  updateBook,
  deleteBook,
  getBookById,
};
