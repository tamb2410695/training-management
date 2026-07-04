const dotenv = require("dotenv");

dotenv.config();

const env = {
  app: {
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV || "development",
  },

  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
  },

  upload: {
    rootDirectory: process.env.UPLOAD_DIR || "uploads",
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024,

    folders: {
      avatar: "avatars",
      document: "documents",
      certificate: "certificates",
      temp: "temp",
    },
  },
};

module.exports = env;
