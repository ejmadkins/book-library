const express = require("express");
const genreController = require("../controllers/genre");

const router = express.Router();

router.post("/", genreController.createGenres);
router.get("/", genreController.getGenres);
router.get("/:genreId", genreController.getGenreById);
router.patch("/:genreId", genreController.updateGenre);
router.delete("/:genreId", genreController.deleteGenre);

module.exports = router;
