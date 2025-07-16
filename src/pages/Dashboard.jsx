import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { FaBuilding, FaGlobe, FaDownload } from "react-icons/fa";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F43F5E",
];

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [summary, setSummary] = useState({
    totalCompanies: 0,
    totalMarketCap: 0,
    topCountry: "",
    downloads: 0,
    tasksCompleted: 0,
  });

  useEffect(() => {
    fetch("/data.xlsx")
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const rawSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // ✅ Normalize keys by trimming extra spaces
        const sheet = rawSheet.map((row) => {
          const cleanRow = {};
          for (let key in row) {
            cleanRow[key.trim()] = row[key];
          }
          return cleanRow;
        });

        const parsedCompanies = sheet.map((row) => ({
          name: row.Company || "Unknown",
          marketCap: Number(row["Market Cap (USD)"] || 0),
          country: row.Country || "Unknown",
        }));

        const totalMarketCap = parsedCompanies.reduce(
          (acc, c) => acc + c.marketCap,
          0
        );

        const countryCounts = parsedCompanies.reduce((acc, c) => {
          acc[c.country] = (acc[c.country] || 0) + 1;
          return acc;
        }, {});

        const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);
const topCountry = sortedCountries.length > 0 ? sortedCountries[0][0] : "N/A";


        setCompanies(parsedCompanies);
        setSummary({
          totalCompanies: parsedCompanies.length,
          totalMarketCap: totalMarketCap,
          topCountry: topCountry,
          downloads: 12450,
          tasksCompleted: 145,
        });
      });
  }, []);

  const barData = companies
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, 10);

  const pieData = Object.entries(
    companies.reduce((acc, c) => {
      acc[c.country] = (acc[c.country] || 0) + 1;
      return acc;
    }, {})
  ).map(([country, count]) => ({ name: country, value: count }));

  const formatMarketCap = (cap) => {
    if (cap > 1e12) return (cap / 1e12).toFixed(2) + " T";
    if (cap > 1e9) return (cap / 1e9).toFixed(2) + " B";
    if (cap > 1e6) return (cap / 1e6).toFixed(2) + " M";
    return cap.toLocaleString();
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📊 Dashboard Overview
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Companies */}
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Companies</p>
              <h2 className="text-3xl font-bold">{summary.totalCompanies}</h2>
            </div>
            <div className="text-yellow-500 text-4xl">🏢</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Active companies listed</p>
        </div>

        {/* Market Cap */}
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              <h2 className="text-3xl font-bold">
                {formatMarketCap(summary.totalMarketCap)} USD
              </h2>
            </div>
            <div className="text-green-500 text-4xl">💰</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Total market valuation</p>
        </div>

        {/* Top Country */}
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Top Country</p>
              <h2 className="text-3xl font-bold">{summary.topCountry}</h2>
            </div>
            <div className="text-blue-500 text-4xl">🌍</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Most companies by country
          </p>
        </div>

        {/* Downloads */}
        <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Downloads</p>
              <h2 className="text-3xl font-bold">
                {summary.downloads.toLocaleString()}
              </h2>
            </div>
            <div className="text-purple-500 text-4xl">⬇️</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">App downloads to date</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ✅ BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Top 10 Market Caps
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(val) => {
                  if (val >= 1e12) return (val / 1e12).toFixed(1) + "T";
                  if (val >= 1e9) return (val / 1e9).toFixed(1) + "B";
                  if (val >= 1e6) return (val / 1e6).toFixed(1) + "M";
                  return val.toLocaleString();
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const cap = payload[0].value;
                    return (
                      <div className="bg-white p-2 rounded shadow border text-sm">
                        <p className="font-semibold">{label}</p>
                        <p>
                          Market Cap:{" "}
                          <span className="font-bold">
                            {cap >= 1e12
                              ? `$${(cap / 1e12).toFixed(2)}T`
                              : cap >= 1e9
                              ? `$${(cap / 1e9).toFixed(2)}B`
                              : cap >= 1e6
                              ? `$${(cap / 1e6).toFixed(2)}M`
                              : `$${cap.toLocaleString()}`}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="marketCap">
                {barData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ PIE CHART with legend BELOW */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Company Distribution by Country
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`pie-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* ✅ Legend BELOW */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            {pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                ></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ NEW RAW DATA TABLE */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📄 Full Company Dataset
        </h2>

        {/* Scrollable table container */}
        <div className="overflow-y-auto max-h-96 border rounded">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3">Company</th>
                <th className="p-3">Market Cap</th>
                <th className="p-3">Country</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{formatMarketCap(c.marketCap)}</td>
                  <td className="p-3">{c.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
