const { Book, Reader } = require("../models");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);
  // platform example missing await
  try {
    const newItem = await Model.create(item);
    res.status(201).json(newItem);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    } else {
      res.sendStatus(500).send(err);
    }
  }
};

const getItems = async (res, model) => {
  const Model = getModel(model);

  const items = await Model.findAll();

  if (!items) {
    res.sendStatus(404);
  } else {
    res.status(200).json(items);
  }
};

const getItemById = async (res, model, id) => {
  const Model = getModel(model);
  console.log(id);

  const item = await Model.findByPk(id);

  if (!item) {
    // changed from sendStatus to status and added the error key
    res.status(404).send({ error: "The reader could not be found." });
  } else {
    res.status(200).json(item);
  }
};

const updateItem = async (res, model, item, id) => {
  const Model = getModel(model);

  try {
    const [updatedRows] = await Model.update(item, {
      where: { id: id },
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

const deleteItem = async (res, model, id) => {
  const Model = getModel(model);

  try {
    const deletedRows = await Model.destroy({ where: { id: id } });

    if (!deletedRows) {
      res.status(404).send({ error: "The reader could not be found." });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
