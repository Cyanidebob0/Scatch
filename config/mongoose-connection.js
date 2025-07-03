const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/scatch_db")
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

module.export = mongoose.connection;
