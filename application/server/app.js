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
app.use('/assets', express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));


const defaultRoutes = require("./routes/defaultRoutes");
app.use("/", defaultRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
