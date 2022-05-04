// const { Genre } = require("../models");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

const createGenres = (req, res) => createItem(res, "genre", req.body);

const getGenres = (_, res) => getItems(res, "genre");

const getGenreById = (req, res) =>
  getItemById(res, "genre", req.params.genreId);

const updateGenre = (req, res) =>
  updateItem(res, "genre", req.body, req.params.genreId);

const deleteGenre = (req, res) => deleteItem(res, "genre", req.params.genreId);

module.exports = {
  createGenres,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
