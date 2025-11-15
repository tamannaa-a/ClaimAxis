import React from "react";
import { Home, FileText, File, Layers } from "lucide-react";

export default function Sidebar({ route, setRoute }){
  const items = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "analyze", label: "Analyze Claim", icon: FileText },
    { id: "classify", label: "Document Classifier", icon: File },
    { id: "summarize", label: "Policy Summarizer", icon: Layers },
  ];

  return (
    <aside className="w-72 h-screen p-6 bg-gradient-to-b from-[#06102a] to-[#071029] border-r border-transparent">
      <div className="mb-6">
        <div className="text-3xl brand-gradient">ClaimSphere</div>
        <div className="mt-1 text-sm subtle">Intelligent Claims Co-pilot</div>
      </div>

      <nav className="space-y-2 mt-6">
        {items.map(it=>{
          const Icon = it.icon;
          const active = route === it.id;
          return (
            <button key={it.id} onClick={()=>setRoute(it.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl ${active ? 'bg-[#071827] ring-1 ring-accent' : 'hover:bg-white/2'}`}>
              <span className={`p-2 rounded-md ${active ? 'bg-[rgba(3,255,214,0.06)]' : ''}`}>
                <Icon size={18} color="white" />
              </span>
              <span className={`${active ? 'text-neon font-semibold' : 'text-gray-200'}`}>{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-10 text-xs muted">Local backend: <span className="text-neon">http://127.0.0.1:8000</span></div>
    </aside>
  );
}
