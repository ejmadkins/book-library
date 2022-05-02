const { Book } = require("../models");

exports.create = async (req, res) => {
  // platform example missing await
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

exports.read = async (_, res) => {
  const books = await Book.findAll();

  if (!books) {
    res.sendStatus(404);
  } else {
    res.status(200).json(books);
  }
};

exports.readById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByPk(bookId);

  if (!book) {
    // changed from sendStatus to status and added the error key
    res.status(404).send({ error: "The book could not be found." });
  } else {
    res.status(200).json(book);
  }
};

// patches an existing artist by Id
exports.update = async (req, res) => {
  const updateData = req.body;
  const { bookId } = req.params;

  try {
    const [updatedRows] = await Book.update(updateData, {
      where: { id: bookId },
    });

    if (!updatedRows) {
      res.status(404).send({ error: "The book could not be found." });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  const { bookId } = req.params;

  try {
    const deletedRows = await Book.destroy({ where: { id: bookId } });

    if (!deletedRows) {
      res.status(404).send({ error: "The book could not be found." });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
