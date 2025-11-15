import React, { useState } from "react";
import { analyzeClaim } from "../api";
import RiskGauge from "../components/RiskGauge";

export default function ClaimAnalyzer() {
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
      <h2 className="text-2xl font-semibold">Claim Analyzer</h2>

      <div className="glass-card p-4 rounded-lg">
        <label className="block text-sm text-gray-300">Paste claim text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="mt-2 w-full p-3 rounded bg-[#061122] text-gray-200" />
        <div className="mt-3 flex items-center gap-3">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={onSubmit} className="button-neon" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Claim"}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-6">
          <div>
            <RiskGauge score={result.fraud?.score ?? 0} />
          </div>
          <div className="glass-card p-4 rounded-lg col-span-2">
            <h3 className="text-lg font-medium">Explanation</h3>
            <pre className="text-sm text-gray-200 mt-2 whitespace-pre-wrap">{result.explanation}</pre>
            <h3 className="text-md font-medium mt-4">Extracted</h3>
            <pre className="text-sm text-gray-300 mt-2">{JSON.stringify(result.extracted, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
