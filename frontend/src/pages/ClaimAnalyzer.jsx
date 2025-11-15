import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { analyzeClaim } from "../api";

export default function ClaimAnalyzer(){
  const [text,setText] = useState("");
  const [res,setRes] = useState(null);
  const [loading,setLoading] = useState(false);

  async function run(){
    setLoading(true);
    try{
      const r = await analyzeClaim(text);
      setRes(r);
    }catch(e){ console.error(e); alert("Analysis failed"); }
    setLoading(false);
  }

  return (
    <>
      <Typography variant="h5">Analyze Claim</Typography>
      <Typography className="small-muted" gutterBottom>Paste claim narrative or upload (upload supported via page enhancements)</Typography>

      <TextField multiline rows={8} fullWidth variant="outlined" value={text} onChange={(e)=>setText(e.target.value)} sx={{ mt:2 }} />
      <Button variant="contained" sx={{ mt:2 }} onClick={run} disabled={loading}>{loading? "Analyzing...":"Analyze Claim"}</Button>

      {res && (
        <Grid container spacing={2} sx={{ mt:2 }}>
          <Grid item xs={12} md={8}>
            <div className="card">
              <Typography variant="h6">Explanation</Typography>
              <pre style={{ whiteSpace: "pre-wrap" }}>{res.explanation}</pre>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="card">
              <Typography variant="h6">Fraud</Typography>
              <div style={{ marginTop: 8 }}>
                <div><strong>Level:</strong> {res.fraud.level}</div>
                <div><strong>Score:</strong> {res.fraud.final_score}</div>
                <div><strong>Reasons:</strong> {res.fraud.reasons.join(", ")}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
