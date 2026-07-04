const navItems = [
  { label: "Dashboard" },
  { label: "Documents" },
  { label: "Upload" },
  { label: "Ask AI" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white px-5 py-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">AI Knowledge Hub</h1>
        <p className="mt-1 text-sm text-gray-500">Document Q&A Assistant</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}