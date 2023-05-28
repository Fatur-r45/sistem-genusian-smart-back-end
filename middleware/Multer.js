import multer from "multer";
import path from "path";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "asset/images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    cb(null, `${timestamp}-${fileName}`);
  },
});

const storagePdf = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "asset/pdf");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    // console.log(path.extname(fileName));
    cb(null, `${timestamp}-${fileName}`);
  },
});

const imageFilter = function (req, file, cb) {
  // Periksa apakah file adalah gambar dengan ekstensi yang diizinkan
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Hanya file pdf yang di perbolehkan"));
  }
  cb(null, true);
};

const pdfFilter = function (req, file, cb) {
  // Periksa apakah file adalah PDF
  if (path.extname(file.originalname) !== ".pdf") {
    const error = new Error("Hanya file pdf yang di perbolehkan");
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

const upload = {
  uploadImage: multer({
    storage: storageImage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 3 * 1000 * 1000,
    },
  }),
  uploadPdf: multer({
    storage: storagePdf,
    fileFilter: pdfFilter,
    limits: {
      fileSize: 3 * 1000 * 1000,
    },
  }),
};

export default upload;
