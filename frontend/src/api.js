import axios from "axios";
const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeClaim(text){
  const form = new FormData();
  form.append("text", text || "");
  const res = await axios.post(`${BASE}/claims/analyze`, form);
  return res.data;
}

export async function classifyDocument(fileText){
  const form = new FormData();
  const blob = new Blob([fileText], { type: "text/plain" });
  form.append("file", blob, "upload.txt");
  const res = await axios.post(`${BASE}/docs/classify`, form);
  return res.data;
}

export async function summarizePolicy(text){
  const form = new FormData();
  form.append("text", text || "");
  const res = await axios.post(`${BASE}/summarize/policy`, form);
  return res.data;
}
