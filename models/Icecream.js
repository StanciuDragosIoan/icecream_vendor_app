const mongoose = require("mongoose");

//create schema
const IcecreamSchema = new mongoose.Schema({
  flavour: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Icecream = mongoose.model("icecream", IcecreamSchema);
