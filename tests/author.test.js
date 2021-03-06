// tests/author.test.js
const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const app = require("../src/app");
const dataFactory = require("../src/helpers/dataFactory");

describe("/authors", () => {
  before(async () => Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const getAuthor = dataFactory.authorsData();
        const response = await request(app).post("/authors").send(getAuthor);
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal(getAuthor.author);
        expect(newAuthorRecord.author).to.equal(getAuthor.author);
      });
      it("cannot create a author if there is no author or title", async () => {
        const response = await request(app).post("/authors").send({});
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let authors;

    beforeEach(async () => {
      // added to ensure tests work with validation
      await Author.destroy({ where: {} });
      authors = await Promise.all([
        Author.create({
          author: "Douglas Adams",
        }),
        Author.create({
          author: "Stephen King",
        }),
        Author.create({
          author: "J. K. Rowling",
        }),
      ]);
    });

    describe("GET /authors", () => {
      it("gets all authors records", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);

          expect(author.author).to.equal(expected.author);
        });
      });
    });

    describe("GET /authors/:id", () => {
      it("gets authors record by id", async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal("Douglas Adams");
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).get("/authors/12345");

        expect(response.status).to.equal(404);
      });
    });

    describe("PATCH /authors/:id", () => {
      it("updates authors author by id", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: "J. R. R. Tolkien" });
        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal("J. R. R. Tolkien");
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app)
          .patch("/authors/12345")
          .send({ author: "Douglas Adams" });

        expect(response.status).to.equal(404);
      });
    });

    describe("DELETE /authors/:id", () => {
      it("deletes author record by id", async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).delete("/authors/12345");
        expect(response.status).to.equal(404);
      });
    });
  });
});
