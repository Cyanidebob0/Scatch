const jwt = require("jsonwebtoken");
const usermodel = require("../models/user-model");

module.exports = isLoggedin = async (req, res, next) => {
  if (!req.cookies.token) {
    res.flash("error", "You need to be logged in first");
    return res.redirect("/login");
  }

  try {
    let data = jwt.verify(req.cookies.token, process.env.ENV_KEY);
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
