import React from 'react';
import ReactECharts from 'echarts-for-react';

const data = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 90 },
  { name: 'Jun', value: 100 },
];

const option = {
  xAxis: {
    type: 'category',
    data: data.map(item => item.name),
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: data.map(item => item.value),
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#8884d8',
      },
      lineStyle: {
        color: '#8884d8',
      },
    },
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#8884d8',
    borderColor: '#8884d8',
    textStyle: {
      color: '#fff',
    },
  },
};

const VehicleSpeedCard = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center">
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      <h2 className="text-xl font-semibold ml-2">Vehicle Speed</h2>
    </div>
    <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />
  </div>
);

export default VehicleSpeedCard;