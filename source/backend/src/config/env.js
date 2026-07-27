const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const env = {
  app: {
    port: Number(process.env.PORT),
    environment: process.env.NODE_ENV,
  },

  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  security: {
    corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS,
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
  },

  upload: {
    rootDirectory: path.resolve(process.cwd(), process.env.UPLOAD_DIR),
    maxFileSize: Number(process.env.MAX_FILE_SIZE),

    folders: {
      avatar: "avatars",
      document: "documents",
      certificate: "certificates",
      temp: "temp",
    },
  },
};

module.exports = env;
