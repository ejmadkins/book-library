/* src/models/reader.js */
module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 8],
      },
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
