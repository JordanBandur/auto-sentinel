import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 90 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 50 },
];

const FuelLevelCard = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold">Fuel Level</h2>
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

export default FuelLevelCard;