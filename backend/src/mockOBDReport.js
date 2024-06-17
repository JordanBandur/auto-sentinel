// src/mockOBDReport.js
const generateMockOBDReport = () => {
  return `
    <h1>Vehicle Health Report</h1>
    <p>Dear User,</p>
    <p>Here is your vehicle's latest health report:</p>
    <ul>
      <li><strong>Engine Status:</strong> Good</li>
      <li><strong>Oil Life:</strong> 75%</li>
      <li><strong>Battery Voltage:</strong> 12.6V</li>
      <li><strong>Coolant Temperature:</strong> 90°C</li>
      <li><strong>Mileage:</strong> 15,000 km</li>
      <li><strong>Tire Pressure:</strong> Front Left: 35 PSI, Front Right: 35 PSI, Rear Left: 34 PSI, Rear Right: 34 PSI</li>
    </ul>
    <p>Please ensure regular maintenance for optimal performance.</p>
    <p>Best regards,<br/>Auto Sentinel Team</p>
  `;
};

module.exports = { generateMockOBDReport };
