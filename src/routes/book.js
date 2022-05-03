const express = require("express");
const bookController = require("../controllers/book");

const router = express.Router();

router.post("/", bookController.createBooks);
router.get("/", bookController.getBooks);
router.get("/:bookId", bookController.getBookById);
router.patch("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);

module.exports = router;
