export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Manage documents and ask questions across your knowledge base.
        </p>
      </div>

      <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
        Aishwarya
      </div>
    </header>
  );
}