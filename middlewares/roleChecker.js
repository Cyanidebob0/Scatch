const jwt = require("jsonwebtoken");
module.exports.isOwner = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to be logged in first");
    return res.redirect("/login");
  }

  try {
    let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    if (data.role === "owner") {
      next();
    } else {
      res.send("You are not authorized to access this page");
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};
