import { Request, Response } from "express";
import { APIError } from "openai";
import { getAllDocuments, getDocumentById } from "../services/document.service";
import { retrieveRelevantChunks } from "../services/retrieval.service";
import { generateAnswerFromChunks } from "../services/ai.service";

export const askQuestion = async (req: Request, res: Response) => {
  try {
    const { question, documentId } = req.body as {
      question?: string;
      documentId?: string;
    };

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    let targetDocuments = [];

    if (documentId && documentId !== "all") {
      const document = getDocumentById(documentId);

      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Document not found",
        });
      }

      targetDocuments = [document];
    } else {
      targetDocuments = getAllDocuments().filter(
        (doc) => doc.status === "processed"
      );
    }

    if (targetDocuments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No processed documents available to search",
      });
    }

    const sources = retrieveRelevantChunks(targetDocuments, question, 3);
    const answer = await generateAnswerFromChunks(question, sources);

    return res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: {
        answer,
        sources,
      },
    });
  } catch (error) {
    console.error("Ask question error:", error);

    if (error instanceof APIError) {
      return res.status(error.status ?? 500).json({
        success: false,
        message: `OpenAI error: ${error.message}`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the answer",
    });
  }
};