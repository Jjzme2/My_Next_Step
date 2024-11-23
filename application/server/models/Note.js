const fs = require("fs");
const path = require("path");

class Note {
  constructor({ title, content, tags, date }) {
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.date = date;
  }

  save() {
    const notesPath = path.join(__dirname, "../../data/notes.json");
    const notes = JSON.parse(fs.readFileSync(notesPath, "utf8"));

    notes.push(this);

    fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
  }

  static findAll() {
    const notesPath = path.join(__dirname, "../../data/notes.json");
    const notes = JSON.parse(fs.readFileSync(notesPath, "utf8"));

    return notes;
  }
}
