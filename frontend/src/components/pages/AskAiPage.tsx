export default function AskAiPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Ask AI</h1>
        <p className="mt-2 text-sm text-gray-600">
          Ask questions about one document or across your uploaded knowledge
          base.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Your Question
        </label>

        <textarea
          rows={5}
          placeholder="Ask something about your uploaded documents..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
        />

        <button className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
          Ask Question
        </button>
      </section>

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-5">
        <h3 className="text-lg font-semibold text-gray-900">Answer Area</h3>
        <p className="mt-2 text-sm text-gray-600">
          Once the backend RAG pipeline is connected, the AI answer and source
          citations will appear here.
        </p>
      </section>
    </div>
  );
}