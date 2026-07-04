const multer = require("multer");
const path = require("path");
const env = require("./env");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = path.join(env.upload.rootDirectory, "documents");


    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;