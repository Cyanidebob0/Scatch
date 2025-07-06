const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const { productName, price, discount } = req.body;

    const createdProduct = await productModel.create({
      name: productName,
      image: req.file.buffer,
      price,
      discount,
    });
    res.redirect("/mainpageowner");
  } catch (error) {
    console.error("Error in create product:", error);
    res.status(500).send("Error creating product: " + error.message);
  }
};
