"use client";

import { useEffect, useState } from "react";
import { getDocuments } from "@/lib/documents";
import { DocumentRecord } from "@/types/document";

function getStatusStyles(status: DocumentRecord["status"]) {
  switch (status) {
    case "processed":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchDocuments() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await getDocuments();
        setDocuments(response.data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to fetch documents";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-2 text-sm text-gray-600">
          View uploaded files and track their processing status.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Uploaded Documents
          </h2>
        </div>

        {isLoading ? (
          <div className="px-5 py-6 text-sm text-gray-600">
            Loading documents...
          </div>
        ) : errorMessage ? (
          <div className="px-5 py-6 text-sm text-red-600">{errorMessage}</div>
        ) : documents.length === 0 ? (
          <div className="px-5 py-6 text-sm text-gray-600">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start justify-between px-5 py-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{doc.originalName}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Uploaded on {new Date(doc.uploadedAt).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Size: {(doc.fileSize / 1024).toFixed(2)} KB
                  </p>

                  {doc.status === "processed" && (
                    <p className="mt-1 text-sm text-gray-500">
                      Chunks created: {doc.chunks?.length ?? 0}
                    </p>
                  )}

                  {doc.errorMessage && (
                    <p className="mt-2 text-sm text-red-600">
                      Error: {doc.errorMessage}
                    </p>
                  )}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}