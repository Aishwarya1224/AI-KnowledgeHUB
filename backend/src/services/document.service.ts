import crypto from "crypto";
import { DocumentRecord } from "../types/document.types";

const documents: DocumentRecord[] = [];

export function createDocumentRecord(
  data: Omit<DocumentRecord, "id" | "uploadedAt">
): DocumentRecord {
  const newDocument: DocumentRecord = {
    id: crypto.randomUUID(),
    uploadedAt: new Date().toISOString(),
    ...data,
  };

  documents.unshift(newDocument);
  return newDocument;
}

export function getAllDocuments(): DocumentRecord[] {
  return documents;
}