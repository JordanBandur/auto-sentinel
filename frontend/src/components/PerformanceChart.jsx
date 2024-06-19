// src/components/PerformanceGraph.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';

const PerformanceGraph = ({ data, title }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default PerformanceGraph;