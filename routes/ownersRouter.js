const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logout-controller");

const createOwnerController = require("../controllers/create-owner-controller");

router.post("/create", createOwnerController);

router.get("/logout", logoutController);

module.exports = router;
