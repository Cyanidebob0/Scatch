const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

module.exports = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role === "user") {
      const user = await userModel.findOne({ email });
      if (!user)
        return res.status(502).send("Username or password is incorrect");
      let ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(500).send("Username or password is incorrect");
      }
      user.role = "user";
      await user.save();
      res.cookie("token", tokenGenerator(user));
      res.redirect("/mainpageuser");
    } else if (role === "owner") {
      const owner = await ownerModel.findOne({ email });
      if (!owner)
        return res.status(502).send("Username or password is incorrect");
      let ismatch = await bcrypt.compare(password, owner.password);
      if (!ismatch) {
        return res.status(500).send("Username or password is incorrect");
      }
      owner.role = "owner";
      await owner.save();
      res.cookie("token", tokenGenerator(owner));
      res.redirect("/mainpageowner");
    } else {
      return res.status(500).send("Invalid role");
    }
  } catch (err) {
    res.send(err.message);
  }
};
