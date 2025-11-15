import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import ClaimAnalyzer from "./pages/ClaimAnalyzer";
import DocumentClassifier from "./pages/DocumentClassifier";
import PolicySummarizer from "./pages/PolicySummarizer";

export default function App(){
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1 }}>
          <TopBar />
          <Box sx={{ p: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analyze" element={<ClaimAnalyzer />} />
              <Route path="/documents" element={<DocumentClassifier />} />
              <Route path="/summaries" element={<PolicySummarizer />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
