const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/create-user-controller");
const loginuserController = require("../controllers/login-user-controller");
const logoutController = require("../controllers/logout-controller");

router.post("/create", createUserController);

router.post("/login", loginuserController);

router.get("/logout", logoutController);

router.get("/", (req, res) => {
  res.send("users");
});

module.exports = router;
