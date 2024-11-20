// utils/markdownRenderer.js
const MarkdownIt = require("markdown-it");
const highlightjs = require('markdown-it-highlightjs'); // Import the syntax highlighting plugin
const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
}).use(highlightjs);

// Markdown renderer function
const renderMarkdown = (markdownContent) => {
  return md.render(markdownContent); // Converts Markdown to HTML
};

// Export the function for use in other modules
module.exports = {
  renderMarkdown,
};
