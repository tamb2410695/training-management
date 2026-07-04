const express = require("express");
const path = require("path");

const cors = require("cors");

const rootRoutes = require("./routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", rootRoutes);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads")),
);

app.use(errorHandler);

module.exports = app;
