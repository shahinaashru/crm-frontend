import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ActiveUsersChart = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Returning Users",
        data: [30, 40, 35, 50, 45, 30, 25],
        backgroundColor: "#28C76F", // Green
      },
      {
        label: "New Users",
        data: [40, 30, 50, 35, 60, 45, 70],
        backgroundColor: "#EA5455", // Orange-red
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h5 style={{ margin: 0 }}>Active Users</h5>
        <span style={{ color: "#EA5455", fontWeight: "bold" }}>2K User</span>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActiveUsersChart;
