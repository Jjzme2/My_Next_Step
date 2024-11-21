const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml"); // We will use a YAML parser to handle the metadata

const applicationDir = path.join(__dirname, "application");
// const developerDir = path.join(__dirname, "developer");

const applicationFiles = fs.readdirSync(applicationDir).filter((file) => file.endsWith(".md")).sort();
// const developerFiles = fs.readdirSync(developerDir).filter((file) => file.endsWith(".md")).sort();

const noteFiles = [
  ...applicationFiles.map((file) => ({ file, folder: "application" })),
//   ...developerFiles.map((file) => ({ file, folder: "developer" }))
];

// Read the contents of each .md file and extract metadata
const notes = noteFiles.map(({ file, folder }) => {
  const filePath = path.join(__dirname, folder, file); // Get the full path to the file
  const content = fs.readFileSync(filePath, "utf-8"); // Read file content as a string

  // Regular expression to match YAML Front Matter (between --- markers)
  const match = content.match(/^-{3}([\s\S]*?)-{3}/);

  // Extract metadata if available
  let metadata = {};
  let fileContent = content;

  if (match) {
    try {
      metadata = yaml.load(match[1]); // Parse the YAML metadata using js-yaml
      fileContent = content.replace(match[0], ""); // Remove the YAML part from content
    } catch (e) {
      console.error("Error parsing YAML metadata:", e);
    }
  }

  metadata.folder = folder; // Add folder name to metadata

  return { file, metadata, content: fileContent.trim() }; // Return an object with the file, metadata, and content
});

module.exports = notes; // Export the notes array

// Function to add a new note to the collection
const addNoteToCollection = (note) => {
  const noteDir = path.join(__dirname, note.folder);
  const noteFileName = `${note.title.replace(/\s+/g, '_').toLowerCase()}.md`;
  const noteFilePath = path.join(noteDir, noteFileName);

  const noteContent = `---
title: "${note.title}"
date: "${note.date}"
tags: ${JSON.stringify(note.tags)}
---

${note.content}`;

  fs.writeFileSync(noteFilePath, noteContent);

  // Add the new note to the notes array
  notes.push({
    file: noteFileName,
    metadata: {
      title: note.title,
      date: note.date,
      tags: note.tags,
      folder: note.folder
    },
    content: note.content
  });
};

module.exports.addNoteToCollection = addNoteToCollection;
