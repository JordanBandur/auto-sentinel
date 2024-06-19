import { useContext } from 'react';
import { MaintenanceContext } from '../context/MaintenanceContext';

const Maintenance = () => {
  const { recommendations } = useContext(MaintenanceContext);

  return (
    <div className="maintenance">
      <h1>Maintenance Recommendations</h1>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Maintenance;