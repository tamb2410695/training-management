const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const userCreationService = require("@/modules/users/userCreation.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedStudents() {
  try {
    const students = [
      {
        account: {
          username: "student03",
          accountEmail: "student03@example.com",
          password: "student123",
        },
        profile: {
          fullName: "Nguyen Van A",
          gender: "MALE",
          dateOfBirth: "2003-01-01",
          phone: "0911111111",
          personalEmail: "a@gmail.com",
          address: "Can Tho",
        },
      },
      {
        account: {
          username: "student04",
          accountEmail: "student04@example.com",
          password: "student123",
        },
        profile: {
          fullName: "Tran Thi B",
          gender: "FEMALE",
          dateOfBirth: "2003-02-02",
          phone: "0911111112",
          personalEmail: "b@gmail.com",
          address: "Can Tho",
        },
      },
      {
        account: {
          username: "student05",
          accountEmail: "student05@example.com",
          password: "student123",
        },
        profile: {
          fullName: "Le Van C",
          gender: "MALE",
          dateOfBirth: "2002-03-03",
          phone: "0911111113",
          personalEmail: "c@gmail.com",
          address: "Can Tho",
        },
      },
      {
        account: {
          username: "student06",
          accountEmail: "student06@example.com",
          password: "student123",
        },
        profile: {
          fullName: "Pham Thi D",
          gender: "FEMALE",
          dateOfBirth: "2003-04-04",
          phone: "0911111114",
          personalEmail: "d@gmail.com",
          address: "Can Tho",
        },
      },
      {
        account: {
          username: "student07",
          accountEmail: "student07@example.com",
          password: "student123",
        },
        profile: {
          fullName: "Hoang Van E",
          gender: "MALE",
          dateOfBirth: "2002-05-05",
          phone: "0911111115",
          personalEmail: "e@gmail.com",
          address: "Can Tho",
        },
      },
    ];

    for (const student of students) {
      await userCreationService.createStudent(student.account, student.profile);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
