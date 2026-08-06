const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const registrationsService = require("@/modules/registrations/registrations.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedRegistrations() {
  try {
    const registrations = [
      {
        fullName: "Nguyen Van A",
        gender: "MALE",
        dateOfBirth: "2003-01-01",
        phone: "0922000001",
        personalEmail: "reg1@gmail.com",
        address: "Can Tho",
      },
      {
        fullName: "Tran Thi B",
        gender: "FEMALE",
        dateOfBirth: "2003-02-02",
        phone: "0922000002",
        personalEmail: "reg2@gmail.com",
        address: "Can Tho",
      },
      {
        fullName: "Le Van C",
        gender: "MALE",
        dateOfBirth: "2002-03-03",
        phone: "0922000003",
        personalEmail: "reg3@gmail.com",
        address: "Can Tho",
      },
      {
        fullName: "Pham Thi D",
        gender: "FEMALE",
        dateOfBirth: "2003-04-04",
        phone: "0922000004",
        personalEmail: "reg4@gmail.com",
        address: "Can Tho",
      },
      {
        fullName: "Hoang Van E",
        gender: "MALE",
        dateOfBirth: "2002-05-05",
        phone: "0922000005",
        personalEmail: "reg5@gmail.com",
        address: "Can Tho",
      },
    ];

    for (const registration of registrations) {
      await registrationsService.create(registration);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
