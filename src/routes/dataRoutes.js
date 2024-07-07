const express = require("express");
const router = express.Router();
const { getAllItems, createItem } = require("../controllers/dataController");

router.get("/", getAllItems);
router.post("/", createItem);

module.exports = router;
