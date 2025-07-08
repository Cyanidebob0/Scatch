const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const { sort } = req.query;
    let sortOption = { price: 1 }; 

    if (sort === "price_desc") {
      sortOption = { price: -1 };
    }

    const products = await productModel.find().sort(sortOption);

    res.render("mainpageowner", {
      products,
      sort: sort || "price_asc",
      successMsg: req.flash("success") || [],
    });
  } catch (error) {
    console.error("Error sorting products:", error);
    res.redirect("/mainpageowner");
  }
};
