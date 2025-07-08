const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

module.exports = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let owner = await ownerModel.findOne({ email });
    if (owner) {
      req.flash("error", "An account with this email already exists");
      return res.redirect("/registerasowner");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password: hashPass,
    });

    res.cookie("token", tokenGenerator(createdOwner));
    req.flash("success", "Registration successful!");
    res.redirect("/mainpageowner");
  } catch (err) {
    res.send(err.message);
  }
};
