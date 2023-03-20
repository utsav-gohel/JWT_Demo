const noteModel = require("../model/note");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNotes = await noteModel.create({
      title: title,
      description: description,
      userId: req.userId,
    });
    res.status(201).json({
      data: newNotes,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: "error",
      error: e,
    });
  }
};
const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await noteModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(404).json({
      msg: "can not update",
      error: e,
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(404).json({
      msg: "can not delete",
      error: e,
    });
  }
};
const getNote = async (req, res) => {
  try {
    const data = await noteModel.find({ userId: req.userId });
    res.status(200).json({
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      error: e,
      msg: "error",
    });
  }
};

module.exports = { createNote, deleteNote, getNote, updateNote };
