const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    req.flash("success", "Product deleted successfully");
    res.redirect("/mainpageowner");
  } catch (error) {
    console.error("Error deleting product:", error);
    req.flash("error", "Failed to delete product");
    res.redirect("/mainpageowner");
  }
};
