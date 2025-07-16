import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard"); // default to dashboard

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "analytics" && <Analytics />}
    </Layout>
  );
}
