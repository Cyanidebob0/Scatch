const jwt = require("jsonwebtoken");
const usermodel = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to be logged in first");
    return res.redirect("/login");
  }

  try {
    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await usermodel
      .findOne({ email: data.email })
      .select("-password");
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "something went wrong");
    res.redirect("/login");
  }
};
