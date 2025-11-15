import React from "react";
import KPICard from "../components/KPICard";
import RiskGauge from "../components/RiskGauge";
import { LineChart, Line, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";

const trendData = [
  {name: 'Jan', fraud: 0.12},
  {name: 'Feb', fraud: 0.10},
  {name: 'Mar', fraud: 0.14},
  {name: 'Apr', fraud: 0.18},
  {name: 'May', fraud: 0.15},
  {name: 'Jun', fraud: 0.22},
];

export default function Dashboard(){
  const [score, setScore] = React.useState(0.17);

  React.useEffect(()=>{
    const id = setInterval(()=> setScore(prev => Math.min(0.9, +(prev + Math.random()*0.03).toFixed(2))), 5000);
    return ()=>clearInterval(id);
  },[]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Overview</h2>
        <div className="text-sm subtle">Last sync: just now</div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Active Fraud Rate" value={`${Math.round(score*100)}%`} delta="+2.4%">
          <div className="mt-2 text-sm subtle">Real-time risk signal across claims</div>
        </KPICard>

        <KPICard title="Avg Claim (₹)" value="₹ 38,200" delta="-1.2%">
          <div className="mt-2 text-sm subtle">Rolling 30-day average</div>
        </KPICard>

        <KPICard title="High Risk Count" value="8" delta="+1">
          <div className="mt-2 text-sm subtle">Pending manual review</div>
        </KPICard>

        <div className="card p-4 rounded-xl">
          <div className="text-sm subtle">Monthly Fraud Trend</div>
          <div style={{height:120}} className="mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
                <YAxis tickFormatter={val=>`${Math.round(val*100)}%`} stroke="rgba(255,255,255,0.4)" />
                <Tooltip formatter={val => `${Math.round(val*100)}%`} />
                <Line type="monotone" dataKey="fraud" stroke="#03ffd6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="card p-4 rounded-xl">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <ul className="mt-3 text-sm subtle space-y-2">
              <li>• Model trained (synthetic) — Accuracy: 95%</li>
              <li>• Document classifier: add dataset → retrain</li>
              <li>• Policy summarizer: offline T5 available</li>
            </ul>
          </div>

          <div className="card p-4 rounded-xl mt-4">
            <h3 className="text-lg font-semibold">System Explanation Snapshot</h3>
            <p className="mt-3 text-sm subtle">Each prediction is produced by an ensemble: ML model + rule-based signals. Explanations show feature contributions and highlighted keywords (for audit).</p>
          </div>
        </div>

        <div>
          <RiskGauge score={score} />
        </div>
      </div>
    </div>
  );
}
