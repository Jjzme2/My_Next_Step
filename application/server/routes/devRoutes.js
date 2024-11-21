const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

const NoteCollection = require("../assets/notes/index.js")
const { renderMarkdown } = require("../utils/markdownRenderer.js");

router.get("/", (req, res) => {
	  res.render("login", {
	title: "Wiki Home Page", // Dynamic title for the page
  });
});

// !Testing purposes only

router.get("/connect", (req, res) => {
	const database = require("../_services/databaseService.js");
	database.connect();
	res.send("Connected to the database");
});



// * General

router.get("/home", (req, res) => {
  res.render("home", {
    title: "Home Page", // Dynamic title for the page
  });
});


// * Notes

router.get("/notes", (req, res) => {
	  res.render("noteList", {
	title: "Notes Page", // Dynamic title for the page
	notes: NoteCollection,
  });
});

router.get("/notes/:id", (req, res) => {
  const note = NoteCollection.find((note) => note.metadata.id === req.params.id);

  if (!note) {
    return res.status(404).render("404", {
      title: "Page Not Found",
      error: "Note not found",
      additionalInfo: req.params.id,
    });
  }

  const renderedContent = renderMarkdown(note.content);

  res.render("note", {
    title: "Wiki - " + note.metadata.title, // Dynamic title for the page
    content: renderedContent, // Pass content to the template
  });
});

router.post("/notes/new", (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const noteDir = path.join(__dirname, '../assets/notes');
  const noteFileName = `${title.replace(/\s+/g, '_').toLowerCase()}.md`;
  const noteFilePath = path.join(noteDir, noteFileName);

  const noteContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
tags: ${JSON.stringify(tags)}
---

${content}`;

  fs.writeFile(noteFilePath, noteContent, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add note' });
    }
    res.status(201).json({ message: 'Note added successfully' });
  });
});


// * Resources

router.get("/resources", (req, res) => {
	const resources = require("../assets/storage/resources.js");
  const packages = require("../assets/storage/packages.js");

	  res.render("resources", {
	title: "Resources Page", // Dynamic title for the page
	resources: resources,
  packages: packages,
  });
});

module.exports = router;
