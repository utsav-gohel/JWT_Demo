const express = require("express");
const auth = require("../middleware/auth");
const {
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controller/noteControllers");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNote);
noteRouter.post("/", auth, createNote);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.patch("/:id", auth, updateNote);

module.exports = noteRouter;
