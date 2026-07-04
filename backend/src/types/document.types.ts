export type DocumentStatus = "uploaded" | "processing" | "processed" | "failed";

export type DocumentRecord = {
  id: string;
  originalName: string;
  storedFileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  status: DocumentStatus;
  uploadedAt: string;
  extractedText?: string;
  errorMessage?: string;
};