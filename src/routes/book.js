const express = require("express");
const bookController = require("../controllers/book");

const router = express.Router();

router.post("/", bookController.create);
router.get("/", bookController.read);
router.get("/:bookId", bookController.readById);
router.patch("/:bookId", bookController.update);
router.delete("/:bookId", bookController.delete);

module.exports = router;
