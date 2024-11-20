const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml"); // We will use a YAML parser to handle the metadata

const noteFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith(".md") && file !== "index.js").sort();


// Read the contents of each .md file and extract metadata
const notes = noteFiles.map((file) => {
  const filePath = path.join(__dirname, file); // Get the full path to the file
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

  return { file, metadata, content: fileContent.trim() }; // Return an object with the file, metadata, and content
});

module.exports = notes; // Export the notes array