const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  const products = await productModel.find();
  res.render("mainpageuser", { products ,sort:"price_asc"});
};
