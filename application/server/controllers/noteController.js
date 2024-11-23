const fs = require("fs");
const path = require("path");
const Note = require("../models/Note");
const logger = require("../utils/logger");

exports.addNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    logger.warn("Title and content are required");
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

    logger.info("Note added successfully");
    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    logger.error(`Failed to add note: ${error.message}`);
    res.status(500).json({ error: "Failed to add note" });
  }
};
