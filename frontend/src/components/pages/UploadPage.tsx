export default function UploadPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload PDFs to your knowledge base so they can be processed for
          question answering.
        </p>
      </section>

      <section className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Drag and drop your PDF here
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Or click to browse and upload a document
        </p>

        <button className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
          Choose File
        </button>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Supported file types
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          MVP support will start with PDF uploads. DOCX and TXT can be added
          later.
        </p>
      </section>
    </div>
  );
}