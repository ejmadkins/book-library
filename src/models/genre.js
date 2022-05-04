/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validation: {
        notNull: {
          args: [true],
          msg: "We need a book genre",
        },
        notEmpty: {
          args: [true],
          msg: "The book genre cannot be empty",
        },
      },
    },
  };
  const GenreModel = connection.define("Genre", schema, {
    scopes: {
      excludePassword: {
        attributes: { exclude: ["password"] },
      },
    },
  });
  return GenreModel;
};
