const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/create-user-controller");


router.post("/create", createUserController);

router.get("/", (req, res) => {
  res.send("users");
});



module.exports = router;
