import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { classifyDocument } from "../api";
import TextField from "@mui/material/TextField";

export default function DocumentClassifier(){
  const [fileText, setFileText] = useState("");
  const [result, setResult] = useState(null);

  function onFile(e){
    const f = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev)=> setFileText(ev.target.result);
    if(f) reader.readAsText(f);
  }

  async function run(){
    const r = await classifyDocument(fileText);
    setResult(r);
  }

  return (
    <>
      <Typography variant="h5">Document Classifier</Typography>
      <Typography className="small-muted" gutterBottom>Upload a PDF / text to auto-classify</Typography>

      <input type="file" onChange={onFile} accept=".txt,.pdf" />
      <Button variant="contained" sx={{ ml:2 }} onClick={run}>Classify</Button>

      {result && <div className="card" style={{ marginTop: 16 }}>
        <div><strong>Type:</strong> {result.document_type || result.type}</div>
        <div><strong>Confidence:</strong> {Math.round((result.confidence || 0)*100)}%</div>
      </div>}
    </>
  );
}
