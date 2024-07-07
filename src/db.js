const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/adaca_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error:", err));
