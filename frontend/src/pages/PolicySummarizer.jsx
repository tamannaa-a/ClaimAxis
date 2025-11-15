import React, { useState } from "react";
import { summarizePolicy } from "../api";

export default function PolicySummarizer() {
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
      alert("Summarization failed. Model may still be loading on backend.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Policy Summarizer</h2>

      <div className="glass-card p-4 rounded-lg mt-3">
        <label className="block text-sm text-gray-300">Paste policy text (or upload PDF)</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="mt-2 w-full p-3 rounded bg-[#061122] text-gray-200" />
        <div className="mt-3 flex items-center gap-3">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button onClick={onSummarize} className="button-neon" disabled={loading}>
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>
      </div>

      {summary && (
        <div className="glass-card p-4 rounded-lg mt-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <p className="mt-2 text-gray-200">{summary}</p>
        </div>
      )}
    </div>
  );
}
