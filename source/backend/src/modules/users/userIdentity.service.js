const db = require("@/config/database");

const accountsRepository = require("../accounts/accounts.repository");
const studentsRepository = require("../students/students.repository");
const staffsRepository = require("../staffs/staffs.repository");

const { NotFoundError } = require("@/utils/errors");

const { throwIf } = require("@/utils/helpers");

const { ERROR_CODES } = require("@/constants");

const getAccountIdentity = async (accountId, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(!account, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

  let profile = null;

  if (account.roleCode === ROLE_CODES.STUDENT) {
    profile = await studentsRepository.findByAccountId(accountId, connection);
  }

  if (account.roleCode === "STAFF") {
    profile = await staffsRepository.findByAccountId(accountId, connection);
  }

  return {
    accountId: account.accountId,
    username: account.username,
    email: account.email,
    roleCode: account.roleCode,
    roleLabel: account.roleLabel,
    profileType: account.roleCode,
    profileId: profile?.studentId || profile?.staffId || null,
    profileCode: profile?.studentCode || profile?.staffCode || null,
  };
};

module.exports = {
  getAccountIdentity,
};
