"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Documents", href: "/documents" },
  { label: "Upload", href: "/upload" },
  { label: "Ask AI", href: "/ask-ai" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white px-5 py-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">AI Knowledge Hub</h1>
        <p className="mt-1 text-sm text-gray-500">Document Q&A Assistant</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}