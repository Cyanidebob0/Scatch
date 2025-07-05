const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

module.exports = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(500).send("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    let createdUser = await userModel.create({
      fullname,
      email,
      password: hashPass,
    });
    res.cookie("token", tokenGenerator(createdUser));
    res.redirect("/mainpage");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
