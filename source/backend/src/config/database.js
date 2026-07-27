const mysql = require("mysql2/promise");
const env = require("@/config/env");

const pool = mysql.createPool({
  ...env.database,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
});

module.exports = pool;
