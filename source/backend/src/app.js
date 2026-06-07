const express = require("express");
const cors = require("cors");

const authRoute =
    require("./modules/auth/auth.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

module.exports = app;