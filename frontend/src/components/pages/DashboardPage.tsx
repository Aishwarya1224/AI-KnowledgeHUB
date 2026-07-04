"use client";

import { useEffect, useState } from "react";
import { getBackendHealth } from "@/lib/health";

const summaryCards = [
  {
    title: "Total Documents",
    value: "0",
    description: "Documents uploaded to your knowledge base",
  },
  {
    title: "Processed Documents",
    value: "0",
    description: "Files ready for question answering",
  },
  {
    title: "Questions Asked",
    value: "0",
    description: "Questions asked across all documents",
  },
];

type BackendStatus = "loading" | "connected" | "disconnected";

export default function DashboardPage() {
  const [backendStatus, setBackendStatus] =
    useState<BackendStatus>("loading");
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    async function checkBackendHealth() {
      try {
        const response = await getBackendHealth();
        setBackendStatus(response.success ? "connected" : "disconnected");
        setBackendMessage(response.message);
      } catch (error) {
        setBackendStatus("disconnected");
        setBackendMessage("Could not connect to backend");
        console.error("Health check failed:", error);
      }
    }

    checkBackendHealth();
  }, []);

  const statusStyles = {
    loading: "bg-yellow-100 text-yellow-700",
    connected: "bg-green-100 text-green-700",
    disconnected: "bg-red-100 text-red-700",
  };

  const statusLabel = {
    loading: "Checking...",
    connected: "Connected",
    disconnected: "Disconnected",
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-gray-600">
          This dashboard will help you upload documents, track processing, and
          ask grounded questions using your own knowledge base.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold text-gray-900">
              {card.value}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Backend Connection Status
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This checks whether the frontend can reach the backend API.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              statusStyles[backendStatus]
            }`}
          >
            {statusLabel[backendStatus]}
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
          {backendMessage || "Waiting for backend response..."}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Next milestone</h2>
        <p className="mt-2 text-sm text-gray-600">
          Next we’ll connect the Upload page to a real backend file upload API.
        </p>
      </section>
    </div>
  );
}