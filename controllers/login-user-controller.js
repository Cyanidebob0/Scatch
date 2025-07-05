const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(502).send("Username or password is incorrect");
    let ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(500).send("Username or password is incorrect");
    }
    res.cookie("token", tokenGenerator(user));
    res.redirect("/mainpage");
  } catch (err) {
    res.send(err.message);
  }
};
