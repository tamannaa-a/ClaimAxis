import React, { useState } from "react";
import { classifyDocument } from "../api";

function useDropZone(onFile) {
  const ref = React.useRef();
  React.useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    function handleDrop(e){
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if(f) onFile(f);
    }
    function handleDrag(e){ e.preventDefault(); }
    el.addEventListener('drop', handleDrop);
    el.addEventListener('dragover', handleDrag);
    return ()=> {
      el.removeEventListener('drop', handleDrop);
      el.removeEventListener('dragover', handleDrag);
    };
  }, [onFile]);
  return ref;
}

export default function DocumentClassifier(){
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropRef = useDropZone(setFile);

  const onClassify = async () => {
    if(!file) return alert("Select a file");
    setLoading(true);
    try {
      const res = await classifyDocument(file);
      setResult(res);
    } catch (e) {
      alert("Failed to classify document");
      console.error(e);
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Document Classifier</h2>

      <div className="card p-4 rounded-xl">
        <div ref={dropRef} className="border-dashed border-2 border-white/6 p-6 rounded-lg text-center">
          <div className="text-sm subtle">Drag & drop a PDF or click to choose</div>
          <input className="mt-3" type="file" onChange={e=>setFile(e.target.files[0])} />
          {file && <div className="mt-3 text-sm">Selected: {file.name}</div>}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={onClassify} className="btn-neon" disabled={loading}>{loading?"Classifying...":"Classify Document"}</button>
          {result && <div className="text-sm subtle">Result: <strong className="text-neon">{result.document_type}</strong> ({(result.confidence*100).toFixed(1)}%)</div>}
        </div>
      </div>
    </div>
  );
}
