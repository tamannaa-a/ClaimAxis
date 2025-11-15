import React from "react";
import { motion } from "framer-motion";

export default function RiskGauge({ score = 0 }) {
  const pct = Math.round((score || 0) * 100);
  const color = score >= 0.7 ? "bg-red-500" : score >= 0.55 ? "bg-yellow-400" : "bg-green-400";

  return (
    <div className="card p-5 rounded-xl">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-sm subtle">Fraud Risk</div>
          <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <div className="text-4xl font-bold mt-2">{pct}%</div>
          </motion.div>
          <div className="text-xs subtle mt-1">Score</div>
        </div>
        <div className="flex-1">
          <div className="h-4 w-full bg-white/3 rounded-full">
            <div className={`${color} h-4 rounded-full`} style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs subtle mt-2">Level: <strong className="text-neon">{score>=0.7?'High':score>=0.55?'Medium':'Low'}</strong></div>
        </div>
      </div>
    </div>
  );
}
