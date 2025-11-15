import React from "react";

export default function KPICard({ title, value, delta, children }) {
  return (
    <div className="card p-4 rounded-xl shadow-neon-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm subtle">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
        </div>
        <div className="text-right">
          <div className="text-sm subtle">{delta}</div>
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
