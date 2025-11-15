import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import DocumentClassifier from "./pages/DocumentClassifier";
import PolicySummarizer from "./pages/PolicySummarizer";
import ClaimAnalyzer from "./pages/ClaimAnalyzer";

export default function App() {
  const [route, setRoute] = React.useState("dashboard");

  return (
    <div className="min-h-screen flex">
      <Sidebar route={route} setRoute={setRoute} />
      <main className="flex-1 p-6">
        {route === "dashboard" && <Dashboard />}
        {route === "analyze" && <ClaimAnalyzer />}
        {route === "classify" && <DocumentClassifier />}
        {route === "summarize" && <PolicySummarizer />}
      </main>
    </div>
  );
}
