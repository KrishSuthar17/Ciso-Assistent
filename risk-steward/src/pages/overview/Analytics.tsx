import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Summary from "./tabs/Summary";



const Dashboard = () => {

  const [risks, setRisks] = useState([]);
  const [controls, setControls] = useState([]);
  const [assets, setAssets] = useState([]);

  const location = useLocation();
  const isAnalyticsRoot = location.pathname === "/overview/analytics";


  const tabs = [
    { label: "Summary", path: "summary" },
    { label: "Governance", path: "governance" },
    { label: "Risk", path: "risk" },
    { label: "Compliance", path: "compliance" },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/risks/")
      .then((res) => res.json())
      .then((data) => setRisks(data));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/controls/")
      .then((res) => res.json())
      .then((data) => setControls(data));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assets/")
      .then((res) => res.json())
      .then((data) => setAssets(data));
  }, []);

  return (

    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-purple-700">Analytics</h2>
          <p className="text-sm text-gray-500">Home / Analytics</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={`/analytics/${tab.path}`}
              className={`pb-2 ${location.pathname.endsWith(tab.path)
                ? "border-b-2 border-purple-700 font-bold text-purple-700"
                : "text-gray-600"
                }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>



        {/* Conditional rendering */}
        <div className="mt-6">
          {isAnalyticsRoot ? (
            <Summary />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>

  );
};

export default Dashboard;
