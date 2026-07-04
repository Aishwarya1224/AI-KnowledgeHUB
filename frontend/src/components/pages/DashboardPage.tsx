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

export default function DashboardPage() {
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

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Next milestone</h2>
        <p className="mt-2 text-sm text-gray-600">
          Next we’ll build document upload, backend APIs, and the RAG flow.
        </p>
      </section>
    </div>
  );
}