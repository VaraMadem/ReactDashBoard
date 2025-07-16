import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD"];

export default function CountryPieChart({ data }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Company Distribution by Country</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#1E40AF"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
