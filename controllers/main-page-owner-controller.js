const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  const products = await productModel.find();
  const successMsg = req.flash('success') || [];
  res.render("mainpageowner", { products, successMsg ,sort:"price_asc"});
};
