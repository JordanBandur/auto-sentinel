import React from 'react';
import { motion } from 'framer-motion';
import BatteryVoltageCard from './cards/BatteryVoltageCard';
import EngineRPMCard from './cards/EngineRPMCard';
import VehicleSpeedCard from './cards/VehicleSpeedCard';
import FuelLevelCard from './cards/FuelLevelCard';
import CoolantTemperatureCard from './cards/CoolantTemperatureCard';
import OilPercentageCard from './cards/OilPercentageCard';
import CarAnimation from './animations/CarAnimation';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <motion.header
        className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold">Auto Sentinel Dashboard</h1>
      </motion.header>
      <main className="relative p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EngineRPMCard />
          <VehicleSpeedCard />
          <FuelLevelCard />
          <CoolantTemperatureCard />
          <BatteryVoltageCard />
          <OilPercentageCard />
          <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-3">
            <CarAnimation />
          </div>
        </div>
      </main>
      <motion.footer
        className="relative p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      </motion.footer>
    </div>
  );
};

export default Dashboard;