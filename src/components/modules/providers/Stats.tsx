"use client";

import { useEffect, useState } from "react";
import { getAllProviders } from "@/services/providers";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Provider {
  id: string;
  isApproved: boolean;
  location: string;
  createdAt: string;
}

const COLORS = ["#4ade80", "#facc15", "#f87171"]; // green, yellow, red

const ProviderStats = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllProviders();
        setProviders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center py-10">Loading stats...</p>;

  const total = providers?.length;
  const approved = providers?.filter(p => p.isApproved).length;
  const pending = total - approved;

  const newThisMonth = providers.filter(
    p => new Date(p.createdAt).getMonth() === new Date().getMonth()
  ).length;

  // Top 3 locations
  const locationCounts: Record<string, number> = {};
  providers.forEach(p => {
    locationCounts[p.location] = (locationCounts[p.location] || 0) + 1;
  });
  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Pie chart data
  const pieData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Provider Dashboard Stats</h1>

      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold">{total}</h2>
          <p>Total Providers</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold">{approved}</h2>
          <p>Approved</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold">{pending}</h2>
          <p>Pending</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center hover:shadow-lg transition">
          <h2 className="text-xl font-bold">{newThisMonth}</h2>
          <p>New This Month</p>
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">Approval Status</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top locations */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Top Locations</h2>
        <ul className="list-disc list-inside">
          {topLocations.map(([loc, count]) => (
            <li key={loc}>
              {loc}: {count} provider{count > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProviderStats;