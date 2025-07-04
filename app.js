const express = require("express");
const app = express();

const cookie = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const usermodel = require("./models/user-model");
const productmodel = require("./models/product-model");
const ownermodel = require("./models/owner-model");
const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouters");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie());
app.set("view engine", "ejs");

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
