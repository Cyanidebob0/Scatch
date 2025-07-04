const express = require("express");
const app = express();
const dbgr = require("debug")("development:main");

const path = require("path");

require("dotenv").config();

const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouters");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const homeRouter = require("./models/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);
app.use("/", homeRouter);

app.listen(3000, () => {
  dbgr("Server is running");
});
