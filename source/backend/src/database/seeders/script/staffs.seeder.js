const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  ERROR_CODES,
  ROLES,
} = require("@/constants");
const userCreationService = require("@/modules/users/userCreation.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedStaffs() {
  try {
    const users = [
      {
        account: {
          username: "admin01",
          accountEmail: "admin01@example.com",
          password: "adminSystem123",
          roleCode: ROLES.ADMIN,
        },
        profile: {
          fullName: "Nguyen Van Admin",
          personalEmail: "admin@company.com",
          gender: "MALE",
          dateOfBirth: "1985-01-10",
          phone: "0901000001",
          address: "Can Tho",
          hireDate: "2020-01-01",
        },
      },
      {
        account: {
          username: "staff01",
          accountEmail: "staff01@example.com",
          password: "staffSystem123",
          roleCode: ROLES.INSTRUCTOR,
        },
        profile: {
          fullName: "Tran Thi Staff",
          personalEmail: "staff@company.com",
          gender: "FEMALE",
          dateOfBirth: "1990-03-15",
          phone: "0901000002",
          address: "Can Tho",
          hireDate: "2021-02-01",
        },
      },
      {
        account: {
          username: "teacher01",
          accountEmail: "teacher01@example.com",
          password: "teacherSystem123",
          roleCode: ROLES.INSTRUCTOR,
        },
        profile: {
          fullName: "Le Van Teacher",
          personalEmail: "teacher@company.com",
          gender: "MALE",
          dateOfBirth: "1988-06-20",
          phone: "0901000003",
          address: "Can Tho",
          hireDate: "2019-08-01",
        },
      },
      {
        account: {
          username: "assistant01",
          accountEmail: "assistant@example.com",
          password: "assistantSystem123",
          roleCode: ROLES.INSTRUCTOR,
        },
        profile: {
          fullName: "Pham Thi Assistant",
          personalEmail: "assistant@company.com",
          gender: "FEMALE",
          dateOfBirth: "1992-05-01",
          phone: "0901000004",
          address: "Can Tho",
          hireDate: "2022-01-15",
        },
      },
      {
        account: {
          username: "mentor01",
          accountEmail: "mentor@example.com",
          password: "mentorSystem123",
          roleCode: ROLES.INSTRUCTOR,
        },
        profile: {
          fullName: "Hoang Van Mentor",
          personalEmail: "mentor@company.com",
          gender: "MALE",
          dateOfBirth: "1987-12-08",
          phone: "0901000005",
          address: "Can Tho",
          hireDate: "2018-06-01",
        },
      },
    ];

    for (const user of users) {
      await userCreationService.createStaff(user.account, user.profile);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
