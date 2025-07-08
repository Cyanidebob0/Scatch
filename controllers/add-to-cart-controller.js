const userModel = require("../models/user-model");

module.exports = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;
    user.cart.push(productId);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/mainpageuser");
  } catch (error) {
    req.flash("error", "Failed to add product to cart");
    res.redirect("/mainpageuser");
  }
};
