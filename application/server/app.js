const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const JWTUtil = require("./utils/JWTUtil");
const session = require("express-session");
const logger = require("./utils/logger"); // Import the logger module

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "general/layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (req.route?.meta?.requiresAuth && !token) {
    logger.warn("Unauthorized request to ${req.route.path}. Token not found");
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token not found" });
  }

  if (token) {
    const verifiedToken = await JWTUtil.verifyTokenWithRevocationCheck(token);
    if (!verifiedToken) {
      return res
        .status(403)
        .json({ error: "Forbidden", message: "Invalid or expired token" });
    }
    req.user = verifiedToken;
  }

  next();
};

app.use(authMiddleware);

const devRoutes = require("./routes/devRoutes");
app.use("/devcenter", authMiddleware, devRoutes);

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", authMiddleware, apiRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.use("*", (req, res) => {
  res.status(404).send("Route not found.");
});

app.use("/devcenter/*", (req, res) => {
  res.status(404).send("Admin route not found.");
});

app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`); // Add logging for server start
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`); // Add logging for error handling middleware
  res.status(500).json({ error: "Internal Server Error" });
});
