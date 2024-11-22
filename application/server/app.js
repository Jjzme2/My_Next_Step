const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const JWTUtil = require("./utils/JWTUtil");
const publicRoutes = [
	"/",
	"/auth/login",
	"/auth/register"
];


const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "general/layout"); // Default layout

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

// Serve `client/dist` for the root
app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Serve index.html for any unmatched root-level routes (SPA fallback)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Middleware to verify JWT token for protected routes
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token && !publicRoutes.includes(req.path)) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token not found' });
  }

  const verifiedToken = JWTUtil.verifyToken(token);
  if (!verifiedToken) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  req.user = verifiedToken;
  next();
});

// Middleware to check for authentication only on routes that are not in the `publicRoutes` array
app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.redirect('/login');
  }

  const verifiedToken = JWTUtil.verifyToken(token);
  if (!verifiedToken) {
    return res.redirect('/login');
  }

  req.user = verifiedToken;
  next();
});

// Admin routes
const devRoutes = require("./routes/devRoutes");
app.use("/devcenter", devRoutes);

// API routes
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

// Auth routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

// Handle unmatched routes for the root
app.use("*", (req, res) => {
  res.status(404).send("Route not found.");
});

// Handle unmatched routes for admin or API (optional)
app.use("/devcenter/*", (req, res) => {
  res.status(404).send("Admin route not found.");
});
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
