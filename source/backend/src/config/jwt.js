const jwt = require("jsonwebtoken");
const { default: env } = require("./env");

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
  return jwt.verify(token, env.jwt.accessSecret);
};

module.exports = {
  generateAccessTokens,
  verifyAccessToken,
};
