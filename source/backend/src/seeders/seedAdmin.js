const bcrypt = require("bcrypt");

const passwordHash = await bcrypt.hash("admin123", 10);

await pool.execute(
  `
  INSERT INTO ACCOUNT (
    role_id,
    username,
    email,
    password_hash
  )
  VALUES (?, ?, ?, ?)
  `,
  [1, "admin", "admin@gmail.com", passwordHash],
);
