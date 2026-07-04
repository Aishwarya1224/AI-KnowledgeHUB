import crypto from "crypto";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DocumentChunk } from "../types/document.types";

export async function chunkText(
  text: string,
  documentId: string
): Promise<DocumentChunk[]> {
  if (!text.trim()) {
    return [];
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 200,
  });

  const splitTexts = await splitter.splitText(text);

  return splitTexts.map((chunkText, index) => ({
    id: crypto.randomUUID(),
    documentId,
    chunkIndex: index,
    content: chunkText,
  }));
}