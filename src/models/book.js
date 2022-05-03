/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        notNull: {
          args: [true],
          msg: "We need a book author",
        },
        notEmpty: {
          args: [true],
          msg: "The book author cannot be empty",
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
    },
    ISBN: {
      type: DataTypes.STRING,
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
