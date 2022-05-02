/* src/models/book.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      unique: true,
    },
    genre: {
      type: DataTypes.STRING,
    },
    ISBN: {
      type: DataTypes.STRING,
    },
  };
  const BookModel = connection.define("Book", schema);
  return BookModel;
};
