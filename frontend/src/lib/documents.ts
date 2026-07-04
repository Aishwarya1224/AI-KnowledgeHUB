const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";

import { DocumentRecord } from "@/types/document";

export type UploadDocumentResponse = {
  success: boolean;
  message: string;
  data?: DocumentRecord;
};

export type GetDocumentsResponse = {
  success: boolean;
  message: string;
  data: DocumentRecord[];
};

export async function uploadDocument(
  file: File
): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const rawText = await response.text();
    throw new Error(
      `Upload API did not return JSON. Response was: ${rawText.slice(0, 200)}`
    );
  }

  const data = (await response.json()) as UploadDocumentResponse;

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}

export async function getDocuments(): Promise<GetDocumentsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/documents`);

  const data = (await response.json()) as GetDocumentsResponse;

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch documents");
  }

  return data;
}