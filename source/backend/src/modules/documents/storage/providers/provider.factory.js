const env = require("@/config/env");
const { STORAGE_PROVIDERS } = require("../storage.constants");

const localProvider = require("./local.provider");
const { throwIf, ConflictError } = require("@/utils");
const { ERROR_MESSAGES } = require("@/constants");

const providers = {
  [STORAGE_PROVIDERS.LOCAL]: localProvider,
};

const getProvider = () => {
  const providerName = env.upload.provider || STORAGE_PROVIDERS.LOCAL;

  const provider = providers[providerName];

  throwIf(!provider, ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return provider;
};

module.exports = {
  getProvider,
};
