const express = require("express");
const cors = require("cors");

const rootRoutes = require("./routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", rootRoutes);

app.use(errorHandler);

module.exports = app;