const { Book, Reader, Genre, Author } = require("../models");

const getIncludes = (model) => {
  if (model === "book") {
    return { include: [Genre, Author, Reader] };
  } else {
    return { include: Book };
  }
};

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
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
    const errorMessages = err.errors.map((e) => e.message);

    res.status(400).json({ errors: errorMessages });
  }
};

const getItems = async (res, model) => {
  const Model = getModel(model);

  const includes = getIncludes(model);

  const items = await Model.scope("excludePassword").findAll({
    ...includes,
  });

  if (!items) {
    res.sendStatus(404);
  } else {
    res.status(200).json(items);
  }
};

const getItemById = async (res, model, id) => {
  const Model = getModel(model);

  const includes = getIncludes(model);

  const item = await Model.scope("excludePassword").findByPk(id, {
    ...includes,
  });

  if (!item) {
    // changed from sendStatus to status and added the error key
    res.status(404).send({ error: "The item could not be found." });
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
      res.status(404).send({ error: "The item could not be found." });
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
      res.status(404).send({ error: "The item could not be found." });
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
