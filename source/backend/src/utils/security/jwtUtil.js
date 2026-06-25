const jwt = require("jsonwebtoken");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // const refreshToken = jwt.sign(payload, process.env.JWT_EXPIRES_IN, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });
  return { accessToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateTokens,
  verifyAccessToken,
};
