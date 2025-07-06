const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const logoutController = require("../controllers/logout-controller");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(500).send("Internal error cannot create a user");
    }
    try {
      const { fullname, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hashPass,
      });
      res.cookie("token", tokenGenerator(createdOwner));
      res.status(201).send("Owner created successfully");
    } catch (err) {
      res.send(err.message);
    }
  });
}

router.get("/logout", logoutController);

module.exports = router;
