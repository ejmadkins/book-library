/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          args: [true],
          msg: "We need a book title",
        },
        notEmpty: {
          args: [true],
          msg: "The book title cannot be empty",
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          args: [true],
          msg: "We need an ISBN",
        },
        notEmpty: {
          args: [true],
          msg: "The ISBN cannot be empty",
        },
      },
    },
  };
  const BookModel = connection.define("Book", schema, {
    scopes: {
      excludePassword: {
        attributes: { exclude: ["password"] },
      },
    },
  });
  return BookModel;
};
