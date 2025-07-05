const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  let error = req.flash("error");
  res.render("login", { error });
});

router.get("/mainpage", isLoggedin, (req, res) => {
  res.render("mainpage");
});

module.exports = router;
