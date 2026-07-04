import "dotenv/config";
import OpenAI from "openai";
import { RetrievedChunk } from "../types/ask.types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAnswerFromChunks(
  question: string,
  chunks: RetrievedChunk[]
): Promise<string> {
  if (chunks.length === 0) {
    return "I could not find relevant information in the uploaded documents to answer that question.";
  }

  const context = chunks
    .map(
      (chunk, index) =>
        `Source ${index + 1} - ${chunk.documentName} (chunk ${chunk.chunkIndex}):\n${chunk.content}`
    )
    .join("\n\n");

  const prompt = `
You are an AI document assistant.
Answer the user's question using only the provided document excerpts.
If the answer is not present in the excerpts, say that the information was not found in the uploaded documents.
Keep the answer clear and concise.

User question:
${question}

Document excerpts:
${context}
  `.trim();

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text.trim();
}