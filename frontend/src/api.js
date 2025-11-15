import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function analyzeClaim({ file, text }) {
  const form = new FormData();
  if (file) form.append("file", file);
  if (text) form.append("text", text);
  const res = await axios.post(`${BASE}/claims/analyze`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}

export async function classifyDocument(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await axios.post(`${BASE}/docs/classify`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}

export async function summarizePolicy({ file, text }) {
  const form = new FormData();
  if (file) form.append("file", file);
  if (text) form.append("text", text);
  const res = await axios.post(`${BASE}/summarize/policy`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}
