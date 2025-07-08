const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const loginuserController = require("../controllers/login-user-controller");
const { isOwner } = require("../middlewares/roleChecker");
const mainpageownercontroller = require("../controllers/main-page-owner-controller");
const mainpageusercontroller = require("../controllers/main-page-user-controller");
const sortcontroller = require("../controllers/sort-controller");

router.get("/", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  let error = req.flash("error");
  res.render("login", { error });
});

router.post("/login", loginuserController);

router.get("/mainpageuser", isLoggedin, mainpageusercontroller);

router.get("/mainpageowner", isLoggedin, isOwner, mainpageownercontroller);

router.get("/createproduct", isLoggedin, isOwner, (req, res) => {
  res.render("createproduct");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/editproduct/:id", isLoggedin, isOwner, async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.render("editproduct", { product });
});

router.get("/sort", isLoggedin, sortcontroller);

router.get("/cart", isLoggedin, (req, res) => {
  res.render("cart");
});

router.get("/registerasowner", (req, res) => {
  res.render("registerasowner", { 
    error: req.flash("error")[0],
    success: req.flash("success")[0]
  });
});

module.exports = router;
