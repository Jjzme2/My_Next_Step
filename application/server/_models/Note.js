const fs = require("fs");
const path = require("path");

class Note {
  constructor({ title, content, tags, date }) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.date = date;
  }

  async save() {
    const noteDir = path.join(__dirname, "../assets/notes");
    const noteFileName = `${this.title.replace(/\s+/g, "_").toLowerCase()}.md`;
    const noteFilePath = path.join(noteDir, noteFileName);

    const noteContent = `---
title: "${this.title}"
date: "${this.date}"
tags: ${JSON.stringify(this.tags)}
---

${this.content}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(noteFilePath, noteContent, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = Note;
