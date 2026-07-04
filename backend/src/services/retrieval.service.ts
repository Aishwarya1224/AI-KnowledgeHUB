import { DocumentRecord } from "../types/document.types";
import { RetrievedChunk } from "../types/ask.types";

function normalizeText(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ");
}

function getQuestionKeywords(question: string): string[] {
  const normalized = normalizeText(question);

  return normalized
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2);
}

function calculateChunkScore(chunkText: string, keywords: string[]): number {
  const normalizedChunk = normalizeText(chunkText);

  let score = 0;

  for (const keyword of keywords) {
    if (normalizedChunk.includes(keyword)) {
      score += 1;
    }
  }

  return score;
}

export function retrieveRelevantChunks(
  documents: DocumentRecord[],
  question: string,
  topK = 3
): RetrievedChunk[] {
  const keywords = getQuestionKeywords(question);

  if (keywords.length === 0) {
    return [];
  }

  const scoredChunks: RetrievedChunk[] = [];

  for (const document of documents) {
    if (!document.chunks || document.chunks.length === 0) {
      continue;
    }

    for (const chunk of document.chunks) {
      const score = calculateChunkScore(chunk.content, keywords);

      if (score > 0) {
        scoredChunks.push({
          documentId: document.id,
          documentName: document.originalName,
          chunkId: chunk.id,
          chunkIndex: chunk.chunkIndex,
          content: chunk.content,
          score,
        });
      }
    }
  }

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, topK);
}