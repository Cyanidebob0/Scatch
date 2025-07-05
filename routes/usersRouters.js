const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/create-user-controller");
const loginuserController = require("../controllers/login-user-controller");

router.post("/create", createUserController);

router.post("/login", loginuserController);

router.get("/", (req, res) => {
  res.send("users");
});

module.exports = router;
