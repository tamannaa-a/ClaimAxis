import React, { useState } from "react";
import { classifyDocument } from "../api";

export default function DocumentClassifier() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClassify = async () => {
    if (!file) return alert("Choose a file first");
    setLoading(true);
    try {
      const res = await classifyDocument(file);
      setResult(res);
    } catch (e) {
      alert("Failed to classify. Check backend logs.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Document Classifier</h2>

      <div className="glass-card p-4 rounded-lg mt-3">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <div className="mt-3">
          <button onClick={onClassify} className="button-neon" disabled={loading}>
            {loading ? "Classifying..." : "Classify Document"}
          </button>
        </div>
      </div>

      {result && (
        <div className="glass-card p-4 rounded-lg mt-4">
          <p><strong>Type:</strong> {result.document_type}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
