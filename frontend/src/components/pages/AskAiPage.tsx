"use client";

import { useEffect, useMemo, useState } from "react";
import { getDocuments } from "@/lib/documents";
import { askQuestion } from "@/lib/ask";
import { DocumentRecord } from "@/types/document";
import { AskQuestionResponse } from "@/types/ask";

export default function AskAiPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("all");
  const [question, setQuestion] = useState("");
  const [answerData, setAnswerData] = useState<AskQuestionResponse | null>(null);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [isAsking, setIsAsking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchDocuments() {
      try {
        setIsLoadingDocuments(true);
        setErrorMessage("");

        const response = await getDocuments();
        const processedDocs = response.data.filter(
          (doc) => doc.status === "processed"
        );

        setDocuments(processedDocs);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to fetch documents";
        setErrorMessage(message);
      } finally {
        setIsLoadingDocuments(false);
      }
    }

    fetchDocuments();
  }, []);

  const canAsk = useMemo(() => {
    return question.trim().length > 0 && !isAsking && documents.length > 0;
  }, [question, isAsking, documents.length]);

  async function handleAskQuestion() {
    try {
      if (!question.trim()) {
        setErrorMessage("Please enter a question.");
        return;
      }

      setIsAsking(true);
      setErrorMessage("");
      setAnswerData(null);

      const response = await askQuestion({
        question: question.trim(),
        documentId: selectedDocumentId,
      });

      setAnswerData(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate answer";
      setErrorMessage(message);
    } finally {
      setIsAsking(false);
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Ask AI</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ask questions about one uploaded document or across all processed
          documents.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Choose document scope
            </label>

            {isLoadingDocuments ? (
              <p className="text-sm text-gray-500">Loading documents...</p>
            ) : documents.length === 0 ? (
              <p className="text-sm text-gray-500">
                No processed documents available yet. Upload and process a PDF
                first.
              </p>
            ) : (
              <select
                value={selectedDocumentId}
                onChange={(event) => setSelectedDocumentId(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
              >
                <option value="all">All documents</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.originalName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Your question
            </label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: Summarize the main points of this document"
              rows={5}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <button
              onClick={handleAskQuestion}
              disabled={!canAsk}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isAsking ? "Asking AI..." : "Ask AI"}
            </button>
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}
        </div>
      </section>

      {answerData && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Answer</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {answerData.answer}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Source Chunks Used
            </h2>

            {answerData.sources.length === 0 ? (
              <p className="mt-3 text-sm text-gray-500">
                No relevant chunks were found for this question.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {answerData.sources.map((source) => (
                  <div
                    key={source.chunkId}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="rounded-full bg-white px-2 py-1">
                        {source.documentName}
                      </span>
                      <span className="rounded-full bg-white px-2 py-1">
                        Chunk #{source.chunkIndex}
                      </span>
                      <span className="rounded-full bg-white px-2 py-1">
                        Score: {source.score}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-gray-700">
                      {source.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}