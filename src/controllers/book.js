const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

const createBooks = (req, res) => createItem(res, "book", req.body);

const getBooks = (_, res) => getItems(res, "book");

const getBookById = (req, res) => getItemById(res, "book", req.params.bookId);

const updateBook = (req, res) =>
  updateItem(res, "book", req.body, req.params.bookId);

const deleteBook = (req, res) => deleteItem(res, "book", req.params.bookId);

module.exports = {
  createBooks,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
