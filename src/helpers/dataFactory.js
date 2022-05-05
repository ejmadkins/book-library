const { faker } = require("@faker-js/faker");
const { Book, Author, Genre, Reader } = require("../models");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("../app");

const addAuthor = () => {
  async () => Book.sequelize.sync();
  async () => Author.sequelize.sync();
  async () => Genre.sequelize.sync();
  async () => Reader.sequelize.sync();

  for (i = 1; i <= 10; i++) {
    async () => {
      Genre.create({
        genre: faker.music.genre(),
      }),
        Author.create({
          author: faker.name.findName(),
        }),
        Reader.create({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.word.verb(8),
        }),
        Book.create({
          title: faker.random.words(),
          GenreId: i,
          AuthorId: i,
          ReaderId: i,
          ISBN: faker.random.numeric(),
        });
    };
  }
};
