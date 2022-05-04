// const { Author } = require("../models");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

const createAuthors = (req, res) => createItem(res, "author", req.body);

const getAuthors = (_, res) => getItems(res, "author");

const getAuthorById = (req, res) =>
  getItemById(res, "author", req.params.authorId);

const updateAuthor = (req, res) =>
  updateItem(res, "author", req.body, req.params.authorId);

const deleteAuthor = (req, res) =>
  deleteItem(res, "author", req.params.authorId);

module.exports = {
  createAuthors,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
