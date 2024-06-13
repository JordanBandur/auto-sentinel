import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 12.6 },
  { name: 'Feb', value: 12.7 },
  { name: 'Mar', value: 12.5 },
  { name: 'Apr', value: 12.8 },
  { name: 'May', value: 12.9 },
  { name: 'Jun', value: 12.6 },
];

const BatteryVoltageCard = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">Battery Voltage</h2>
    <LineChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </div>
);

export default BatteryVoltageCard;