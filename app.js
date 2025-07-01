const express = require("express");
const app = express();

const cookie = require("cookie-parser");
const path = require("path");

const usermodel = require("./models/user-model");
const productmodel = require("./models/product-model");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("yo");
});

app.listen(3000, () => {
  console.log("Server is running");
});
