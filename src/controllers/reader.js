// const { Reader } = require("../models");

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helper");

// exports.create = async (req, res) => {
//   // platform example missing await
//   try {
//     const newReader = await Reader.create(req.body);
//     res.status(201).json(newReader);
//   } catch (err) {
//     if (err.name === "SequelizeValidationError") {
//       res.status(400).json({
//         success: false,
//         msg: err.errors.map((e) => e.message),
//       });
//     } else {
//       res.sendStatus(500).send(err);
//     }
//   }
// };

const createReaders = (req, res) => createItem(res, "reader", req.body);

// exports.read = async (_, res) => {
//   const readers = await Reader.findAll();

//   if (!readers) {
//     res.sendStatus(404);
//   } else {
//     res.status(200).json(readers);
//   }
// };

const getReaders = (_, res) => getItems(res, "reader");

// exports.readById = async (req, res) => {
//   const { readerId } = req.params;
//   const reader = await Reader.findByPk(readerId);

//   if (!reader) {
//     // changed from sendStatus to status and added the error key
//     res.status(404).send({ error: "The reader could not be found." });
//   } else {
//     res.status(200).json(reader);
//   }
// };

const getReaderById = (req, res) =>
  getItemById(res, "reader", req.params.readerId);

// // patches an existing artist by Id
// exports.update = async (req, res) => {
//   const updateData = req.body;
//   const { readerId } = req.params;

//   try {
//     const [updatedRows] = await Reader.update(updateData, {
//       where: { id: readerId },
//     });

//     if (!updatedRows) {
//       res.status(404).send({ error: "The reader could not be found." });
//     } else {
//       res.status(200).send();
//     }
//   } catch (err) {
//     res.sendStatus(500);
//   }
// };

const updateReader = (req, res) =>
  updateItem(res, "reader", req.body, req.params.readerId);

// exports.delete = async (req, res) => {
//   const { readerId } = req.params;

//   try {
//     const deletedRows = await Reader.destroy({ where: { id: readerId } });

//     if (!deletedRows) {
//       res.status(404).send({ error: "The reader could not be found." });
//     } else {
//       res.status(204).send();
//     }
//   } catch (err) {
//     res.sendStatus(500);
//   }
// };

const deleteReader = (req, res) =>
  deleteItem(res, "reader", req.params.readerId);

module.exports = {
  createReaders,
  getReaders,
  getReaderById,
  updateReader,
  deleteReader,
};
