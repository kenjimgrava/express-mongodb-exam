const Item = require("../models/dataModel");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().limit(10);
    console.log("Items: ", items);
    res.json(items);
  } catch (error) {
    console.error("items:", error);
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const { fname, lname } = req.body;
  const newItem = new Item({ fname, lname });

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllItems,
  createItem,
};
