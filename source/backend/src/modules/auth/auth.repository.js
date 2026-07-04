const findRefreshTokenByAccountId = async (accountId) => {};

const saveRefreshToken = async (accountId, refreshToken) => {};

const revokeRefreshToken = async (accountId) => {};

const savePasswordResetToken = async (accountId, token) => {};

const findPasswordResetToken = async (token) => {};


module.exports = {
  findRefreshTokenByAccountId,
  saveRefreshToken,
  revokeRefreshToken,
  savePasswordResetToken,
  findPasswordResetToken,
};
