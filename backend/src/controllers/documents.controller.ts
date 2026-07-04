import { Request, Response } from "express";
import {
  createDocumentRecord,
  getAllDocuments,
  updateDocumentStatus,
} from "../services/document.service";
import { extractTextFromPdf } from "../services/pdf.service";
import { chunkText } from "../services/chunk.service";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const documentRecord = createDocumentRecord({
      originalName: req.file.originalname,
      storedFileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: "processing",
    });

    try {
      const extractedText = await extractTextFromPdf(req.file.path);
      const chunks = await chunkText(extractedText, documentRecord.id);

      updateDocumentStatus(documentRecord.id, "processed", {
        extractedText,
        chunks,
      });
    } catch (processingError) {
      console.error("PDF processing error:", processingError);

      updateDocumentStatus(documentRecord.id, "failed", {
        errorMessage:
          processingError instanceof Error
            ? processingError.message
            : "Failed to process PDF",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      data: documentRecord,
    });
  } catch (error) {
    console.error("Upload document error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading the document",
    });
  }
};

export const getDocuments = (_req: Request, res: Response) => {
  try {
    const documents = getAllDocuments();

    return res.status(200).json({
      success: true,
      message: "Documents fetched successfully",
      data: documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching documents",
    });
  }
};