const { Reader } = require("../models");

exports.create = async (req, res) => {
  // platform example missing await
  const newReader = await Reader.create(req.body);
  res.status(201).json(newReader);
};

exports.read = async (_, res) => {
  const readers = await Reader.findAll();

  if (!readers) {
    res.sendStatus(404);
  } else {
    res.status(200).json(readers);
  }
};

exports.readById = async (req, res) => {
  const { readerId } = req.params;
  const reader = await Reader.findByPk(readerId);

  if (!reader) {
    // changed from sendStatus to status and added the error key
    res.status(404).send({ error: "The reader could not be found." });
  } else {
    res.status(200).json(reader);
  }
};

// patches an existing artist by Id
exports.update = async (req, res) => {
  const updateData = req.body;
  const { readerId } = req.params;

  try {
    const [updatedRows] = await Reader.update(updateData, {
      where: { id: readerId },
    });

    if (!updatedRows) {
      res.status(404).send({ error: "The reader could not be found." });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  const { readerId } = req.params;

  try {
    const deletedRows = await Reader.destroy({ where: { id: readerId } });

    if (!deletedRows) {
      res.status(404).send({ error: "The reader could not be found." });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
