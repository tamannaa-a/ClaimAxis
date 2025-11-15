import React from "react";
import { Bell, Settings } from "lucide-react";

export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 px-8 border-b border-transparent">
      <div>
        <div className="text-2xl brand-gradient">ClaimSphere</div>
        <div className="text-xs subtle">Cyber SaaS • Intelligent Claims Co-pilot</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm muted">Org: Demo • Offline</div>
        <button className="p-2 rounded-md hover:bg-white/2 card">
          <Bell size={18} color="white" />
        </button>
        <button className="p-2 rounded-md hover:bg-white/2 card">
          <Settings size={18} color="white" />
        </button>
      </div>
    </header>
  );
}
