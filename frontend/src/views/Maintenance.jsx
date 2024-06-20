import { useContext } from 'react';
import { MaintenanceContext } from '../context/MaintenanceContext';

const Maintenance = () => {
  const { recommendations } = useContext(MaintenanceContext);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString(); 
  };

  return (
    <div className="maintenance">
      <h1>Maintenance</h1>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations recommended as of {getCurrentTimestamp()}</p>
      )}
    </div>
  );
};

export default Maintenance;