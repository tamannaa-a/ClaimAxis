import React from "react";

export default function RiskGauge({ score = 0 }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.7 ? "bg-red-500" : score >= 0.55 ? "bg-yellow-400" : "bg-green-400";
  return (
    <div className="glass-card p-4 rounded-lg shadow-neon">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-300">Fraud Risk</h3>
          <div className="text-3xl font-bold mt-1">{pct}%</div>
          <div className="text-xs text-gray-400 mt-1">Score</div>
        </div>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${color}`}>
          <div className="text-black font-bold">{Math.round(pct/10)}</div>
        </div>
      </div>
    </div>
  );
}
