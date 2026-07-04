import crypto from "crypto";
import { DocumentRecord, DocumentStatus } from "../types/document.types";

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

export function getDocumentById(id: string): DocumentRecord | undefined {
  return documents.find((doc) => doc.id === id);
}

export function updateDocumentStatus(
  id: string,
  status: DocumentStatus,
  extraFields?: Partial<DocumentRecord>
): DocumentRecord | undefined {
  const document = getDocumentById(id);

  if (!document) {
    return undefined;
  }

  document.status = status;

  if (extraFields) {
    Object.assign(document, extraFields);
  }

  return document;
}