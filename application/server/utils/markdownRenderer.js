// utils/markdownRenderer.js
const MarkdownIt = require("markdown-it");
const highlightjs = require('markdown-it-highlightjs');
const markdownItLinkAttributes = require("markdown-it-link-attributes");

const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
}).use(highlightjs).use(markdownItLinkAttributes, {
	  pattern: /^https?:/, // Only apply to external links (starting with "http" or "https")
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer' // Improve security by using this value when opening links in a new tab
  }
});

// Markdown renderer function
const renderMarkdown = (markdownContent) => {
  return md.render(markdownContent); // Converts Markdown to HTML
};

// Export the function for use in other modules
module.exports = {
  renderMarkdown,
};
