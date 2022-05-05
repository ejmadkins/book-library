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
        expect(newBookRecord.ISBN).to.equal("0-671-62964-6");
      });
      it("cannot create a book if there is no author or title", async () => {
        const response = await request(app).post("/books").send({});
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(2);
        expect(newBookRecord).to.equal(null);
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
          ISBN: "0-671-62964-6",
        }),
        Book.create({
          title: "The Shining",
          ISBN: "978-0-385-12167-5",
        }),
        Book.create({
          title: "Harry Potter and the Goblet of Fire",
          ISBN: "0-7475-4624-X",
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
        expect(response.body.ISBN).to.equal("0-671-62964-6");
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
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
      });
    });
  });
});
