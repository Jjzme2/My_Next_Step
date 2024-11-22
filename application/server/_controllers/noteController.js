const fs = require("fs");
const path = require("path");
const Note = require("../_models/Note");

exports.addNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags,
      date: new Date().toISOString(),
    });

    await note.save();

    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
};
