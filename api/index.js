require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

// Import database connection
const db = require("../config/mongoose-connection");

// Import routes
const usersRouter = require("./routes/usersRouters");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const homeRouter = require("./routes/index");

// Session configuration
const sessionConfig = require("../config/session");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));
app.set("view engine", "ejs");
app.use(cookieParser());

// Initialize session
const sessionMiddleware = sessionConfig(app);
app.use(flash());

// Database connection middleware
app.use((req, res, next) => {
  if (db.mongoose.connection.readyState !== 1) {
    return res.status(503).send('Database connection not established');
  }
  next();
});

// Routes
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);
app.use("/", homeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
