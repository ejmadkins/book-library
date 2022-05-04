/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
  };
  const AuthorModel = connection.define("Author", schema, {
    scopes: {
      excludePassword: {
        attributes: { exclude: ["password"] },
      },
    },
  });
  return AuthorModel;
};
