import { Request, Response } from "express";

export const uploadDocument = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        originalName: req.file.originalname,
        storedFileName: req.file.filename,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error("Upload document error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading the document",
    });
  }
};