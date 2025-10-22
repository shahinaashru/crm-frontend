import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 300 },
  { name: "Mar", users: 600 },
  { name: "Apr", users: 200 },
  { name: "May", users: 700 },
];

function UserGrowthChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "30px" }}
      >
        User Growth Chart
      </h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;
