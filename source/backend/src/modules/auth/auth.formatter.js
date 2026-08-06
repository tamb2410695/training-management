const formatUserResponse = (account) => {
  if (!account) return null;

  const { passwordHash, password, ...safeAccount } = account;

  return safeAccount;
};

const formatLoginResponse = ({ user, identity, accessToken }) => {
  return {
    user: formatUserResponse(user),
    identity,
    accessToken,
  };
};
const formatMeResponse = (account) => {
  return formatUserResponse(account);
};

module.exports = {
  formatUserResponse,

  formatLoginResponse,

  formatMeResponse,
};
