const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layout"); // Default layout

// Middleware for serving static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

// Serve `client/dist` for the root
app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Serve index.html for any unmatched root-level routes (SPA fallback)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Admin routes
const devRoutes = require("./routes/devRoutes");
app.use("/devCenter", devRoutes);

// API routes
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// Handle unmatched routes for admin or API (optional)
app.use("/admin/*", (req, res) => {
  res.status(404).send("Admin route not found.");
});
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
