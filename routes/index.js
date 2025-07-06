const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const loginuserController = require("../controllers/login-user-controller");
const { isOwner } = require("../middlewares/roleChecker");

router.get("/", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  let error = req.flash("error");
  res.render("login", { error });
});

router.post("/login", loginuserController);

router.get("/mainpageuser", isLoggedin, (req, res) => {
  res.render("mainpageuser");
});

router.get("/mainpageowner", isLoggedin, isOwner, (req, res) => {
  res.render("mainpageowner");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

module.exports = router;
