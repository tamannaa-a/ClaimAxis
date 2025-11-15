import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ClaimAnalyzer from "./pages/ClaimAnalyzer";
import DocumentClassifier from "./pages/DocumentClassifier";
import PolicySummarizer from "./pages/PolicySummarizer";

export default function App(){
  const [route, setRoute] = React.useState("overview");

  return (
    <div className="min-h-screen flex">
      <Sidebar route={route} setRoute={setRoute} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          {route === "overview" && <Dashboard />}
          {route === "analyze" && <ClaimAnalyzer />}
          {route === "classify" && <DocumentClassifier />}
          {route === "summarize" && <PolicySummarizer />}
        </main>
      </div>
    </div>
  );
}
