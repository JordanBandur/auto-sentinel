import React from 'react';
import { Line } from 'react-chartjs-2';

const testData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Test Data',
      data: [1, 2, 3, 4, 5, 6],
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

const testOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const TestChart = () => {
  return <Line data={testData} options={testOptions} />;
};

export default TestChart;