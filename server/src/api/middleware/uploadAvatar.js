import multer from "multer";
import { v4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "-" + Date.now() + path.extname(file.originalname));
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadAvatar = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default uploadAvatar;
