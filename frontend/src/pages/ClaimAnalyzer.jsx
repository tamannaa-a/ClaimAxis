import React, { useState } from "react";
import { analyzeClaim } from "../api";
import RiskGauge from "../components/RiskGauge";

export default function ClaimAnalyzer(){
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await analyzeClaim({ file, text });
      setResult(res);
    } catch (e) {
      alert("Failed to analyze. Check backend logs.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analyze Claim</h2>
        <div className="text-xs subtle">Use text or upload a PDF</div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 card p-4 rounded-xl">
          <label className="text-sm subtle">Claim narrative</label>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={8} className="mt-2 w-full p-3 rounded bg-[#061122] text-gray-200" />

          <div className="mt-3 flex items-center gap-3">
            <input type="file" onChange={e=>setFile(e.target.files[0])} />
            <button onClick={onSubmit} className="btn-neon" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Claim"}
            </button>
            {result && <span className="ml-3 text-sm text-green-300">Last analysis saved</span>}
          </div>
        </div>

        <div>
          <div className="card p-4 rounded-xl">
            <div className="text-sm subtle">Quick Actions</div>
            <div className="mt-3 space-y-3">
              <button className="btn-neon w-full">Export Report (PDF)</button>
              <button className="btn-neon w-full">Mark for Review</button>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 card p-4 rounded-xl">
            <h3 className="text-lg font-semibold">Explanation</h3>
            <pre className="mt-3 text-sm subtle whitespace-pre-wrap">{result.explanation}</pre>

            <h3 className="text-md font-semibold mt-4">Extracted Entities</h3>
            <pre className="mt-2 text-sm subtle">{JSON.stringify(result.extracted, null, 2)}</pre>
          </div>

          <div>
            <RiskGauge score={result.fraud?.score ?? 0} />
            <div className="card p-3 rounded-xl mt-4">
              <div className="text-sm subtle">Fraud Details</div>
              <div className="mt-2 text-sm">
                <strong>Level:</strong> {result.fraud?.level}<br />
                <strong>Score:</strong> {(result.fraud?.score * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
