const express = require("express");
const dataRoutes = require("./routes/dataRoutes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/data", dataRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
