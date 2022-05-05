const { faker } = require("@faker-js/faker");

const authorsData = () => {
  return {
    author: faker.name.findName(),
  };
};

module.exports = { authorsData };
