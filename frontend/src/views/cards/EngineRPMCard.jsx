import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1400 },
  { name: 'Mar', value: 1600 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 2000 },
  { name: 'Jun', value: 2200 },
];

const EngineRPMCard = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">Engine RPM</h2>
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

export default EngineRPMCard;