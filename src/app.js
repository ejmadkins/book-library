const express = require("express");
const readerController = require("./controllers/reader");
const bookRouter = require("./routes/book");

const app = express();
app.use(express.json());
module.exports = app;

app.post("/readers", readerController.create);
app.get("/readers", readerController.read);
app.get("/readers/:readerId", readerController.readById);
app.patch("/readers/:readerId", readerController.update);
app.delete("/readers/:readerId", readerController.delete);

app.use("/books", bookRouter);
