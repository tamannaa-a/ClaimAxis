import React from "react";

export default function Sidebar({ route, setRoute }) {
  const items = [
    { id: "dashboard", label: "Overview" },
    { id: "analyze", label: "Analyze Claim" },
    { id: "classify", label: "Document Classifier" },
    { id: "summarize", label: "Policy Summarizer" },
  ];

  return (
    <aside className="w-64 p-6 bg-[#071029] border-r border-gray-800 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neon">ClaimSphere</h1>
        <p className="text-sm text-gray-400 mt-1">Intelligent Claims Co-pilot</p>
      </div>

      <nav className="space-y-2">
        {items.map(it => (
          <button
            key={it.id}
            onClick={() => setRoute(it.id)}
            className={`w-full text-left py-3 px-3 rounded-md ${route === it.id ? "bg-[#0f1724] ring-2 ring-accent" : "hover:bg-gray-800/30"}`}
          >
            <span className="font-medium">{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 text-xs text-gray-500">
        <p>Local backend: <span className="text-neon">http://127.0.0.1:8000</span></p>
      </div>
    </aside>
  );
}
