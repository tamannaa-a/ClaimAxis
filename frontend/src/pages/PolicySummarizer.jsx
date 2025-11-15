import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { summarizePolicy } from "../api";

export default function PolicySummarizer(){
  const [text,setText] = useState("");
  const [summary,setSummary] = useState(null);

  async function run(){
    const r = await summarizePolicy(text);
    setSummary(r.summary);
  }

  return (
    <>
      <Typography variant="h5">Policy Summarizer</Typography>
      <Typography className="small-muted" gutterBottom>Paste policy text for a concise summary</Typography>

      <TextField multiline rows={8} fullWidth variant="outlined" value={text} onChange={(e)=>setText(e.target.value)} sx={{ mt:2 }} />
      <Button variant="contained" sx={{ mt:2 }} onClick={run}>Generate Summary</Button>

      {summary && <div className="card" style={{ marginTop: 16 }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{summary}</pre>
      </div>}
    </>
  );
}
