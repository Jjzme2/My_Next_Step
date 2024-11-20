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

// Middleware for serving static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Routes
// Use routes/pageRoutes.js for pages
// app.use("/", require("./routes/pageRoutes"));
// Use routes/apiRoutes.js for API
// app.use("/api", require("./routes/apiRoutes"));

app.get("/", (req, res) => {
  const name = "John Doe"; // Data to be passed into the template
  res.render("index", { name }); // Renders the 'index.ejs' template
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
