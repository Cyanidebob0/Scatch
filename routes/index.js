const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/mainpage", (req, res) => {
  res.render("mainpage");
});

module.exports = router;
