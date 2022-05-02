// tests/book.test.js
const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(
          "The Hitchhiker's Guide to the Galaxy"
        );
        expect(newBookRecord.title).to.equal(
          "The Hitchhiker's Guide to the Galaxy"
        );
        expect(newBookRecord.author).to.equal("Douglas Adams");
        expect(newBookRecord.genre).to.equal("Sci-Fi");
        expect(newBookRecord.ISBN).to.equal("0-671-62964-6");
      });
      it("validates unique title", async () => {
        books = await Book.create({
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        });

        const response = await request(app).post("/books").send({
          title: "The Hitchhiker's Guide to the Galaxy2",
          author: "Douglas Adams",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        });

        expect(response.status).to.equal(400);
      });
      it("validates unique author", async () => {
        books = await Book.create({
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        });

        const response = await request(app).post("/books").send({
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams2",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        });

        expect(response.status).to.equal(400);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      // added to ensure tests work with validation
      await Book.destroy({ where: {} });
      books = await Promise.all([
        Book.create({
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        }),
        Book.create({
          title: "The Hitchhiker's Guide to the Galaxy2",
          author: "Douglas Adams2",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        }),
        Book.create({
          title: "The Hitchhiker's Guide to the Galaxy3",
          author: "Douglas Adams3",
          genre: "Sci-Fi",
          ISBN: "0-671-62964-6",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/books");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /books/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(
          "The Hitchhiker's Guide to the Galaxy"
        );
        expect(response.body.author).to.equal("Douglas Adams");
        expect(response.body.genre).to.equal("Sci-Fi");
        expect(response.body.ISBN).to.equal("0-671-62964-6");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books ISBN by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ ISBN: "0-671-62964-5" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.ISBN).to.equal("0-671-62964-5");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/books/12345")
          .send({ ISBN: "0-671-62964-5" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/books/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
