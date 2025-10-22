import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TaskStatusChart = () => {
  // Example data — you can replace this with dynamic data later
  const data = [
    { name: "Completed", value: 60 },
    { name: "Pending", value: 25 },
    { name: "Hold", value: 15 },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#8884d8"]; // green & orange

  return (
    <div style={{ width: "100%", height: 300, paddingTop: "20px" }}>
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>Task Status</h4>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatusChart;
