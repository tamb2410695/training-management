const multer = require("multer");
const path = require("path");
const fs = require("fs");
const env = require("./env");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.join(
      env.upload.rootDirectory,
      env.upload.folders.temp,
    );

    fs.mkdirSync(uploadPath, {
      recursive: true,
    });

    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: env.upload.maxFileSize,
  },
});

module.exports = upload;
