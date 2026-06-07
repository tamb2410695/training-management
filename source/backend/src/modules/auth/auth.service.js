const db = require("../../config/database");

const login = async (username) => {
  const [rows] = await db.query(
    `
    SELECT
      a.account_id,
      a.username,
      a.password_hash,
      a.account_status,
      r.role_name
    FROM ACCOUNT a
    JOIN ROLE r
      ON a.role_id = r.role_id
    WHERE a.username = ?
    `,
    [username]
  );

  return rows[0];
};

const findByUsername = async (username) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM ACCOUNT
    WHERE username = ?
    `,
    [username]
  );

  return rows[0];
};

const createAccount = async (roleId, username, password, email) => {
  const [result] = await db.query(
    `
    INSERT INTO ACCOUNT
    (
      role_id,
      username,
      password_hash,
      email
    )
    VALUES (?, ?, ?, ?)
    `,
    [roleId, username, password, email]
  );

  return result.insertId;
};

module.exports = {
  login,
  findByUsername,
  createAccount
};
