import { Router } from "express";
import { upload } from "../config/multer";
import { uploadDocument } from "../controllers/documents.controller";

const router = Router();

router.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      return next(error);
    }

    return uploadDocument(req, res);
  });
});

export default router;