// import React from 'react';
// import EngineRPMCard from './EngineRPMCard';
// import VehicleSpeedCard from './VehicleSpeedCard';
// import FuelLevelCard from './FuelLevelCard';
// import CoolantTemperatureCard from './CoolantTemperatureCard';
// import BatteryVoltageCard from './BatteryVoltageCard';
// import OilPercentageCard from './OilPercentageCard';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Auto Sentinel Dashboard</h1>
//       </header>
//       <main className="p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <EngineRPMCard />
//           <VehicleSpeedCard />
//           <FuelLevelCard />
//           <CoolantTemperatureCard />
//           <BatteryVoltageCard />
//           <OilPercentageCard />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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






// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Auto Sentinel Dashboard</h1>
//       </header>
//       <main className="p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Engine RPM</h2>
//             <div className="mt-2">Data Placeholder</div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Vehicle Speed</h2>
//             <div className="mt-2">Data Placeholder</div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Fuel Level</h2>
//             <div className="mt-2">Data Placeholder</div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Coolant Temperature</h2>
//             <div className="mt-2">Data Placeholder</div>
//             </div>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Battery Voltage</h2>
//             <div className="mt-2">Data Placeholder</div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">Oil Percentage Estimate</h2>
//             <div className="mt-2">Data Placeholder</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;