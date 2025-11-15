import React from "react";
import RiskGauge from "../components/RiskGauge";

export default function Dashboard() {
  const [demoScore, setDemoScore] = React.useState(0.12);

  React.useEffect(() => {
    // small animated demo change
    const id = setInterval(() => {
      setDemoScore(prev => Math.min(0.95, +(prev + Math.random()*0.05).toFixed(2)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-white">Overview</h2>

      <div className="grid grid-cols-3 gap-6">
        <RiskGauge score={demoScore} />
        <div className="glass-card p-4 rounded-lg col-span-2">
          <h3 className="text-lg font-medium">Recent Actions</h3>
          <ul className="mt-3 text-sm text-gray-300 space-y-2">
            <li>• Model trained (synthetic) — Accuracy: 95%</li>
            <li>• Document classifier waiting for dataset</li>
            <li>• Policy summarizer ready — offline T5</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
