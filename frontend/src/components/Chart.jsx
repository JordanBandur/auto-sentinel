import React, { useState, useEffect } from "react";
import { AreaChart, Card, Title } from "@tremor/react";

const fetchRealData = async () => {
  try {
    const response = await fetch("/api/obd-sensor-data"); // Replace with your API endpoint
    const data = await response.json();
    return data.map(entry => ({
      date: entry.date,
      "sensor-1": entry.sensor1,
      "sensor-2": entry.sensor2,
      "sensor-3": entry.sensor3,
    }));
  } catch (error) {
    console.error("Error fetching real data:", error);
    return [];
  }
};

const generateMockData = () => {
  let dataset = [];
  const dates = [
    "Jun 30", "Jul 01", "Jul 02", "Jul 03", "Jul 04",
    "Jul 05", "Jul 06", "Jul 07", "Jul 08", "Jul 09",
    "Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14",
    "Jul 15", "Jul 16", "Jul 17"
  ];

  for (let date of dates) {
    dataset.push({
      date,
      "sensor-1": Math.round(150 + Math.random() * 20 - 10),
      "sensor-2": Math.round(200 + Math.random() * 20 - 10),
      "sensor-3": Math.round(250 + Math.random() * 20 - 10),
    });
  }

  return dataset;
};

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const realData = await fetchRealData();
      setData(realData);
    };

    getData();
  }, []);

  return (
    <Card className="mt-8">
      <Title className="mb-2">OBD Sensor Data</Title>
      <AreaChart
        className="mt-4 h-80"
        defaultValue={0}
        data={data.length > 0 ? data : generateMockData()}
        categories={["sensor-1", "sensor-2", "sensor-3"]}
        index="date"
        colors={["indigo", "fuchsia", "emerald"]}
        allowDecimals={false}
        yAxisWidth={60}
        noDataText="No data. Run your first test to get started!"
        showLegend={false}
      />
    </Card>
  );
};

export default Chart;