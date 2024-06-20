/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import PerformanceGraph from './PerformanceChart';

const PerformanceMetrics = ({ performanceData }) => {
  const generateChartData = (data, label) => ({
    labels: data.map((d) => d.time),
    datasets: [
      {
        label,
        data: data.map((d) => d.speed),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  const accelerationChartData = generateChartData(performanceData.accelerationData, 'Acceleration Data');
  const quarterMileChartData = generateChartData(performanceData.quarterMileData, 'Quarter Mile Data');
  const brakingChartData = generateChartData(performanceData.brakingData, 'Braking Data');

  return (
    <Grid container spacing={2} className="performance-data-container">
      <Grid item xs={12}>
        <PerformanceGraph data={accelerationChartData} title="Acceleration Data" yAxisLabel="Speed (mph)" xAxisLabel="Time (s)" />
      </Grid>
      <Grid item xs={12}>
        <PerformanceGraph data={quarterMileChartData} title="Quarter Mile Data" yAxisLabel="Speed (mph)" xAxisLabel="Time (s)" />
      </Grid>
      <Grid item xs={12}>
        <PerformanceGraph data={brakingChartData} title="Braking Data" yAxisLabel="Speed (mph)" xAxisLabel="Time (s)" />
      </Grid>
    </Grid>
  );
};

export default PerformanceMetrics;
