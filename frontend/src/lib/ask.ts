import { apiRequest } from "./api";
import { AskQuestionResponse } from "@/types/ask";

type AskQuestionPayload = {
  question: string;
  documentId?: string;
};

type AskQuestionApiResponse = {
  success: boolean;
  message: string;
  data: AskQuestionResponse;
};

export async function askQuestion(payload: AskQuestionPayload) {
  return apiRequest<AskQuestionApiResponse>("/api/ask", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}