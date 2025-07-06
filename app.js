require("dotenv").config();
const express = require("express");
const app = express();
const dbgr = require("debug")("development:main");

const path = require("path");


const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouters");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const homeRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners", ownersRouter);
app.use("/", homeRouter);

app.listen(3000, () => {
  dbgr("Server is running");
});
