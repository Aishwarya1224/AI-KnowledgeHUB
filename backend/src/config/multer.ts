import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${uniqueSuffix}-${sanitizedOriginalName}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const isPdf = file.mimetype === "application/pdf";

  if (!isPdf) {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});