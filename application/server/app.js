// Import required modules
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const JWTUtil = require("./utils/JWTUtil");
const session = require("express-session");

// Initialize the Express application
const app = express();

// Set the view engine to EJS and specify the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use express-ejs-layouts for consistent layout management
app.use(expressLayouts);
app.set("layout", "general/layout"); // Specify the default layout

// Middleware for parsing incoming requests with JSON and URL-encoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files
app.use("/assets", express.static(path.join(__dirname, "assets"))); // Serve static assets like CSS and JS files
app.use(express.static(path.join(__dirname, "public"))); // Serve other public files

// Serve client build directory as static files
app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Fallback route to serve index.html for root-level routes in a single-page application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Session middleware for handling user sessions
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY, // Use environment variable for security
    resave: false, // Do not save session if it wasn't modified
    saveUninitialized: false, // Do not create session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // Set cookie expiry to 24 hours
    },
  }),
);

// Middleware to verify JWT token for protected routes
const authMiddleware = async (req, res, next) => {
  // Extract token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If the route requires authentication but no token is provided, return unauthorized
  if (req.route?.meta?.requiresAuth && !token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token not found" });
  }

  // If the token exists, verify it
  if (token) {
    const verifiedToken = await JWTUtil.verifyTokenWithRevocationCheck(token);
    if (!verifiedToken) {
      return res
        .status(403)
        .json({ error: "Forbidden", message: "Invalid or expired token" });
    }
    req.user = verifiedToken; // Attach verified user info to the request object
  }

  // Proceed to the next middleware/route handler
  next();
};

// Apply JWT validation middleware globally for routes that require it
app.use(authMiddleware);

// Admin routes (Dev Center)
const devRoutes = require("./routes/devRoutes");
app.use("/devcenter", authMiddleware, devRoutes); // Apply middleware to protect dev routes

// API routes
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", authMiddleware, apiRoutes); // You can add route-specific middleware to protect certain endpoints

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes); // Authentication routes (e.g., login, register, logout)

// Handle unmatched routes for the root (404 errors)
app.use("*", (req, res) => {
  res.status(404).send("Route not found.");
});

// Handle unmatched admin routes for /devcenter
app.use("/devcenter/*", (req, res) => {
  res.status(404).send("Admin route not found.");
});

// Handle unmatched API routes for /api
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

// End of server setup
