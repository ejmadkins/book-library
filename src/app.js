const express = require("express");
const readerController = require("./controllers/reader");
const bookRouter = require("./routes/book");

const app = express();
app.use(express.json());
module.exports = app;

app.post("/readers", readerController.createReaders);
app.get("/readers", readerController.getReaders);
app.get("/readers/:readerId", readerController.getReaderById);
app.patch("/readers/:readerId", readerController.updateReader);
app.delete("/readers/:readerId", readerController.deleteReader);

app.use("/books", bookRouter);
