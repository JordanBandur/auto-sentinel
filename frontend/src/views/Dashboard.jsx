import React from 'react';
import BatteryVoltageCard from './cards/BatteryVoltageCard';
import EngineRPMCard from './cards/EngineRPMCard';
import VehicleSpeedCard from './cards/VehicleSpeedCard';
import FuelLevelCard from './cards/FuelLevelCard';
import CoolantTemperatureCard from './cards/CoolantTemperatureCard';
import OilPercentageCard from './cards/OilPercentageCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Auto Sentinel Dashboard</h1>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EngineRPMCard />
          <VehicleSpeedCard />
          <FuelLevelCard />
          <CoolantTemperatureCard />
          <BatteryVoltageCard />
          <OilPercentageCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;