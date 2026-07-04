"use client";

import { useState, ChangeEvent } from "react";
import { uploadDocument } from "@/lib/documents";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a PDF file first.");
      return;
    }

    try {
      setIsUploading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const response = await uploadDocument(selectedFile);

      setSuccessMessage(
        `${response.message}: ${response.data?.originalName ?? selectedFile.name}`
      );
      setSelectedFile(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Upload failed";
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload PDFs to your knowledge base so they can be processed for
          question answering.
        </p>
      </section>

      <section className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Choose PDF File
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {selectedFile && (
            <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
              Selected file: <span className="font-medium">{selectedFile.name}</span>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-fit rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </section>

      {successMessage && (
        <section className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {successMessage}
        </section>
      )}

      {errorMessage && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Supported file type
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          MVP currently supports PDF uploads only. We’ll add DOCX/TXT later.
        </p>
      </section>
    </div>
  );
}