const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const products = await productModel.find();
    
    
    const successMsg = req.flash('success') || [];
    const errorMsg = req.flash('error') || [];
    
    res.render("mainpageuser", { 
      products,
      sort: "price_asc",
      successMsg: successMsg[0], 
      errorMsg: errorMsg[0]     
    });
  } catch (error) {
    console.error("Error in main page user controller:", error);
    req.flash("error", "Error loading products");
    res.redirect("/");
  }
};
