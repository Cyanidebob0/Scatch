const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/create-user-controller");
const logoutController = require("../controllers/logout-controller");
const isLoggedin = require("../middlewares/isLoggedIn");
const addtocartcontroller = require("../controllers/add-to-cart-controller");
router.post("/create", createUserController);

router.get("/logout", logoutController);

router.get("/addtocart/:id", isLoggedin, addtocartcontroller);

module.exports = router;
