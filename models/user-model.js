const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: Array,
  orders: Array,
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userschema);
