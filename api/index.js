require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const usersRouter = require("./routes/usersRouters");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const homeRouter = require("./routes/index");

const sessionConfig = require("../../config/session");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));
app.set("view engine", "ejs");
app.use(cookieParser());

const sessionMiddleware = sessionConfig(app);
app.use(flash());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);
app.use("/", homeRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
