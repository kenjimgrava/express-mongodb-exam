const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("DataModel", itemSchema);

module.exports = Item;
