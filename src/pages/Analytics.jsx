import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import * as XLSX from "xlsx";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F43F5E",
  "#0EA5E9",
  "#9333EA",
];

// ✅ Format like 1.2M, 3.4B, 2.1T
const formatMarketCap = (value) => {
  if (!value) return "0";
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  return value.toLocaleString();
};

// ✅ Custom tooltip for better readability
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const cap = payload[0].value;
    return (
      <div className="bg-white p-2 rounded shadow border text-sm">
        <p className="font-semibold">{label}</p>
        <p>
          Market Cap:{" "}
          <span className="font-bold">${formatMarketCap(cap)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ Load Excel directly (same as Dashboard)
    fetch("/data.xlsx")
      .then((res) => res.arrayBuffer())
      .then((excelData) => {
        const workbook = XLSX.read(excelData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // ✅ EXACT same parsing as Dashboard
        const parsedCompanies = sheet.map((row) => ({
          Company: row.Company || "Unknown",
          marketCap: Number(row["Market Cap (USD)"]) || 0,
        }));

        // ✅ Sort descending and filter top 10 > 0
        const sortedData = parsedCompanies
          .filter((c) => c.marketCap > 0)
          .sort((a, b) => b.marketCap - a.marketCap)
          .slice(0, 10);

        setData(sortedData);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Market Cap Analytics</h2>

      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="Company" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatMarketCap} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="marketCap">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
