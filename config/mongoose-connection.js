const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/scatch_db";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    dbgr("MongoDB Connected...");
    return mongoose.connection;
  } catch (err) {
    dbgr("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB();
