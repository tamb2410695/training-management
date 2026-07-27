const jwt = require("jsonwebtoken");
const env = require("../../config")

const generateAccessTokens = (payload) => {
  const accessToken = jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpires,
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
  generateAccessTokens,
  verifyAccessToken,
};
