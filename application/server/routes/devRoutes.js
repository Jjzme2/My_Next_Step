const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const JWTUtil = require("../utils/JWTUtil");
const authMiddleware = require("../middleware/authMiddleware");

const NoteCollection = require("../assets/notes/index.js");
const { renderMarkdown } = require("../utils/markdownRenderer.js");
// const userController = require( "../_controllers/userController.js" );

router.get("/", (req, res) => {
  res.render("pages/login", {
    title: "Wiki Home Page", // Dynamic title for the page
    user: req.user || { username: "Guest" },
  });
});

// * General

router.get("/home", (req, res) => {
  res.render("pages/home", {
    title: "Home Page", // Dynamic title for the page
  });
});

// * Notes

router.get("/notes", authMiddleware, (req, res) => {
  res.render("notes/list", {
    title: "Notes Page", // Dynamic title for the page
    notes: NoteCollection,
  });
});

router.get("/notes/create", authMiddleware, (req, res) => {
  res.render("notes/create", {
    title: "Create a New Note",
  });
});

router.get("/notes/:id", authMiddleware, (req, res) => {
  const note = NoteCollection.find(
    (note) => note.metadata.id === req.params.id,
  );

  if (!note) {
    return res.status(404).render("general/404", {
      title: "Page Not Found",
      error: "Note not found",
      additionalInfo: req.params.id,
    });
  }

  const renderedContent = renderMarkdown(note.content);

  res.render("notes/view", {
    title: "Wiki - " + note.metadata.title, // Dynamic title for the page
    content: renderedContent, // Pass content to the template
  });
});

router.post("/notes/new", authMiddleware, (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const noteDir = path.join(__dirname, "../assets/notes");
  const noteFileName = `${title.replace(/\s+/g, "_").toLowerCase()}.md`;
  const noteFilePath = path.join(noteDir, noteFileName);

  const noteContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
tags: ${JSON.stringify(tags)}
---

${content}`;

  fs.writeFile(noteFilePath, noteContent, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add note" });
    }
    res.status(201).json({ message: "Note added successfully" });
  });
});

// * Resources

router.get("/resources", authMiddleware, (req, res) => {
  const resources = require("../assets/storage/resources.js");
  const packages = require("../assets/storage/packages.js");

  res.render("pages/resources", {
    title: "Resources Page", // Dynamic title for the page
    resources: resources,
    packages: packages,
  });
});

module.exports = router;
