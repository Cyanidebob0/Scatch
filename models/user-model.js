const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  contact: Number,
});

module.exports = mongoose.model("user", userschema);
