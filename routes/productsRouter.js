const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const createProductController = require("../controllers/create-product-controller");
const isLoggedin = require("../middlewares/isLoggedIn");
const { isOwner } = require("../middlewares/roleChecker");

router.get("/", (req, res) => {
  res.send("products");
});

router.post("/create", upload.single("productImage"), isLoggedin, isOwner, createProductController);

module.exports = router;
