const mockDocuments = [
  {
    id: 1,
    name: "Product Requirements.pdf",
    status: "Processed",
    uploadedAt: "2026-07-04",
  },
  {
    id: 2,
    name: "Engineering Notes.pdf",
    status: "Pending",
    uploadedAt: "2026-07-03",
  },
];

export default function DocumentsPage() {
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

        <div className="divide-y divide-gray-200">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Uploaded on {doc.uploadedAt}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  doc.status === "Processed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}