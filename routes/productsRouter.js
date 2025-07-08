const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const createProductController = require("../controllers/create-product-controller");
const isLoggedin = require("../middlewares/isLoggedIn");
const { isOwner } = require("../middlewares/roleChecker");
const deleteProductController = require("../controllers/delete-products-controller");
const editProductController = require("../controllers/edit-product-controller");

router.post(
  "/create",
  upload.single("productImage"),
  isLoggedin,
  isOwner,
  createProductController
);

router.post("/deleteproduct/:id", isLoggedin, isOwner, deleteProductController);

router.post(
  "/editproduct/:id",
  upload.single("productImage"),
  isLoggedin,
  isOwner,
  editProductController
);

module.exports = router;
