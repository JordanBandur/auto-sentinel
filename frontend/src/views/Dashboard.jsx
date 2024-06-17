import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BatteryVoltageCard from './cards/BatteryVoltageCard';
import EngineRPMCard from './cards/EngineRPMCard';
import VehicleSpeedCard from './cards/VehicleSpeedCard';
import FuelLevelCard from './cards/FuelLevelCard';
import CoolantTemperatureCard from './cards/CoolantTemperatureCard';
import OilPercentageCard from './cards/OilPercentageCard';
import CarAnimation from './animations/CarAnimation';
import Chart from '../components/Chart';

const Dashboard = () => {
  const sendReport = async () => {
    try {
      await axios.post('/api/emails/send-report');
      alert('Report sent successfully!');
    } catch (error) {
      alert('Failed to send report');
    }
  };

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
          <Chart />
          <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3 mt-6">
            <CarAnimation />
          </div>
          <div className="flex justify-center items-center col-span-1 md:col-span-2 lg:col-span-3 mt-4">
            <button
              onClick={sendReport}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Email OBD Report 
            </button>
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
