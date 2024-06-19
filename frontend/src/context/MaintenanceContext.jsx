import React, { createContext, useState } from 'react';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  console.log('Provider Rendered: Recommendations:', recommendations); // Debug log

  return (
    <MaintenanceContext.Provider value={{ recommendations, setRecommendations }}>
      {children}
    </MaintenanceContext.Provider>
  );
};