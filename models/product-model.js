const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  image: Buffer,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("product", productSchema);
