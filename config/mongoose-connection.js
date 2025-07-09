const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/scatch_db";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    dbgr("MongoDB connection established successfully");
  })
  .catch((err) => {
    dbgr("MongoDB connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("connected", () => {
  dbgr(`Mongoose default connection open to ${MONGODB_URI}`);
});
mongoose.connection.on("error", (err) => {
  dbgr("Mongoose default connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  dbgr("Mongoose default connection disconnected");
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    dbgr("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

module.exports = mongoose.connection;
