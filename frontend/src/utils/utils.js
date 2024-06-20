export const formatLabel = (label) => {
  if (!label) return '';
  return label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export const getFormattedValue = (metric, value) => {
  const decimals = [
    'batteryVoltage',
    'o2SensorVoltage',
    'shortTermFuelTrim',
    'longTermFuelTrim',
    'massAirFlowRate',
    'timingAdvance',
    'controlModuleVoltage',
    'egrError',
    'fuelInjectionTiming',
    'engineFuelRate',
  ];
  return decimals.includes(metric) ? parseFloat(value).toFixed(2) : parseInt(value);
};

export const convertToCSV = (data) => {
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(','));

  // Add rows
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

export const downloadCSV = (data, filename = 'obd_data.csv') => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
