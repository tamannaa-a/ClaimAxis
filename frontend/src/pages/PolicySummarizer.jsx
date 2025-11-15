import React, { useState } from "react";
import { summarizePolicy } from "../api";

export default function PolicySummarizer(){
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSummarize = async () => {
    setLoading(true);
    try {
      const res = await summarizePolicy({ file, text });
      setSummary(res.summary);
    } catch (e) {
      alert("Summarization failed. Check backend logs.");
      console.error(e);
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Policy Summarizer</h2>

      <div className="card p-4 rounded-xl">
        <label className="text-sm subtle">Paste policy text (or upload PDF)</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="mt-2 w-full p-3 rounded bg-[#061122] text-gray-200" />
        <div className="mt-3 flex items-center gap-3">
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
          <button onClick={onSummarize} className="btn-neon" disabled={loading}>
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>
      </div>

      {summary && (
        <div className="card p-4 rounded-xl">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="mt-3 text-sm subtle whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
