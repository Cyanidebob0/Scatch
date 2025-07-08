const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const { productName, price, discount } = req.body;
    const updateData = {
      name: productName,
      price: parseFloat(price),
      discount: parseFloat(discount),
    };

    if (req.file) {
      updateData.image = req.file.buffer;
    }

    await productModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    req.flash("success", "Product updated successfully");
    res.redirect("/mainpageowner");
  } catch (error) {
    console.error("Error updating product:", error);
    req.flash("error", "Failed to update product: " + error.message);
    res.redirect(`/editproduct/${req.params.id}`);
  }
};
