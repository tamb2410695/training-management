const mysql = require("mysql2/promise");
const env = require("./env");

const pool = mysql.createPool({
  ...env.database,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
