const productModel = require("../models/product-model");

module.exports = async (req, res) => {
  try {
    const { sort } = req.query;
    let sortOption = { price: 1 };

    if (sort === "price_desc") {
      sortOption = { price: -1 };
    }

    const products = await productModel.find().sort(sortOption);

    const isOwnerRoute =
      req.originalUrl.includes("owner") ||
      (req.originalUrl === "/sort" &&
        req.headers.referer &&
        req.headers.referer.includes("owner"));

    const template = isOwnerRoute ? "mainpageowner" : "mainpageuser";

    res.render(template, {
      products,
      sort: sort || "price_asc",
      successMsg: req.flash("success") || [],
    });
  } catch (error) {
    console.error("Error sorting products:", error);
    const redirectPath =
      req.headers.referer && req.headers.referer.includes("user")
        ? "/mainpageuser"
        : "/mainpageowner";
    res.redirect(redirectPath);
  }
};
