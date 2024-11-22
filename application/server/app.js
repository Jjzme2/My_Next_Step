const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const JWTUtil = require("./utils/JWTUtil");
const bcrypt = require('bcrypt');
const userService = require('./_services/userService');

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
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const verifiedToken = JWTUtil.verifyToken(token);
  if (!verifiedToken) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  req.user = verifiedToken;
  next();
});

// Middleware to check for authentication only on routes that are not in the `publicRoutes` array
const publicRoutes = ['/login', '/register'];
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

// Handle unmatched routes for admin or API (optional)
app.use("/devcenter/*", (req, res) => {
  res.status(404).send("Admin route not found.");
});
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Route to handle user registration
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.create({ username, password: hashedPassword, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
