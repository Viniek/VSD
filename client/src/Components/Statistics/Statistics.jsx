import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

const conditionData = [
  { name: "VSD", value: 40 },
  { name: "Other Heart Conditions", value: 30 },
  { name: "No Issues", value: 30 },
];
const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

const scanData = [
  { month: "Jan", scans: 30 },
  { month: "Feb", scans: 50 },
  { month: "Mar", scans: 80 },
  { month: "Apr", scans: 70 },
  { month: "May", scans: 100 },
];

const accuracyData = [
  { month: "Jan", accuracy: 85 },
  { month: "Feb", accuracy: 87 },
  { month: "Mar", accuracy: 90 },
  { month: "Apr", accuracy: 88 },
  { month: "May", accuracy: 91 },
];

const StatisticsPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Condition Distribution</h2>
        <PieChart width={300} height={300}>
          <Pie data={conditionData} cx={150} cy={150} outerRadius={100} fill="#8884d8" dataKey="value">
            {conditionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Scans Per Month</h2>
        <BarChart width={500} height={300} data={scanData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="scans" fill="#82ca9d" />
        </BarChart>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md col-span-2">
        <h2 className="text-xl font-semibold mb-4">Model Accuracy Over Time</h2>
        <LineChart width={600} height={300} data={accuracyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#ff7300" />
        </LineChart>
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md col-span-2 text-center">
        <h2 className="text-xl font-semibold">Future Feature: Patient Location Map</h2>
        <p className="text-gray-500">(To be integrated when API is available)</p>
      </div>
    </div>
  );
};

export default StatisticsPage;
