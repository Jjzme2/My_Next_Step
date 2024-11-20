const express = require("express");
const router = express.Router();

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

router.get("/home", (req, res) => {
  res.render("home", {
    title: "Home Page", // Dynamic title for the page
  });
});

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
      additionalInfo: req.params.id, // Fixed to show the correct missing note ID
    });
  }

  const renderedContent = renderMarkdown(note.content);

  res.render("note", {
    title: "Wiki - " + note.metadata.title, // Dynamic title for the page
    content: renderedContent, // Pass content to the template
  });
});


module.exports = router;
