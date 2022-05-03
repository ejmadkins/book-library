// const { Reader } = require("../models");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

const createReaders = (req, res) => createItem(res, "reader", req.body);

const getReaders = (_, res) => getItems(res, "reader");

const getReaderById = (req, res) =>
  getItemById(res, "reader", req.params.readerId);

const updateReader = (req, res) =>
  updateItem(res, "reader", req.body, req.params.readerId);

const deleteReader = (req, res) =>
  deleteItem(res, "reader", req.params.readerId);

module.exports = {
  createReaders,
  getReaders,
  getReaderById,
  updateReader,
  deleteReader,
};
