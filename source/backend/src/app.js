const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const env = require("./config/env");

const rootRoutes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(
  cors({
    origin: env.security.corsAllowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", rootRoutes);

app.use(
  "/uploads",
  express.static(env.upload.rootDirectory),
);

app.use(errorHandler);

module.exports = app;
