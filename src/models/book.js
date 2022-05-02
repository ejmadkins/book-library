/* src/models/reader.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    ISBN,
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
