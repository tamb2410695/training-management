const env = require("./env");

const SALT_ROUNDS = env.security.saltRounds;

module.exports = SALT_ROUNDS;