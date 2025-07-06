const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/create-user-controller");
const logoutController = require("../controllers/logout-controller");

router.post("/create", createUserController);

router.get("/logout", logoutController);



module.exports = router;
