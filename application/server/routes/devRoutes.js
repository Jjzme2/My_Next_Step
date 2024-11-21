const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const JWTUtil = require('../utils/JWTUtil');

const NoteCollection = require("../assets/notes/index.js")
const { renderMarkdown } = require("../utils/markdownRenderer.js");

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const role = JWTUtil.extractRoleFromToken(token);
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

router.get("/", (req, res) => {
	  res.render("pages/login", {
	title: "Wiki Home Page", // Dynamic title for the page
  });
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;
	if (username === "admin" && password === "admin") {
		const token = JWTUtil.generateToken({ username, role: 'admin' });
		res.status(200).json({ token });
	} else {
		res.status(401).json({ error: 'Invalid credentials' });
	}
});

// !Testing purposes only

router.get("/connect", (req, res) => {
	const database = require("../_services/databaseService.js");
	database.connect();
	res.send("Connected to the database");
});



// * General

router.get("/home", (req, res) => {
  res.render("pages/home", {
    title: "Home Page", // Dynamic title for the page
  });
});


// * Notes

router.get("/notes", authenticateAdmin, (req, res) => {
	  res.render("notes/list", {
	title: "Notes Page", // Dynamic title for the page
	notes: NoteCollection,
  });
});

router.get("/notes/create", authenticateAdmin, (req, res) => {
  res.render("notes/create", {
    title: "Create a New Note",
  });
});

router.get("/notes/:id", authenticateAdmin, (req, res) => {
  const note = NoteCollection.find((note) => note.metadata.id === req.params.id);

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

router.post("/notes/new", authenticateAdmin, (req, res) => {
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

router.get("/resources", authenticateAdmin, (req, res) => {
	const resources = require("../assets/storage/resources.js");
  const packages = require("../assets/storage/packages.js");

	  res.render("pages/resources", {
	title: "Resources Page", // Dynamic title for the page
	resources: resources,
  packages: packages,
  });
});

module.exports = router;
