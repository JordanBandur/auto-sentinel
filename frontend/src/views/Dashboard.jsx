import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard p-6 bg-custom-gray dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <header className="py-4 w-full text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">Dashboard</h1>
      </header>
      <main className="w-full max-w-4xl flex flex-col items-center">
        <section className="mb-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">Critical Warnings</h2>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md text-center mx-auto">
            <p className="text-red-500 dark:text-red-400">You have 2 critical issues</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">View Details</button>
          </div>
        </section>
        <section className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">Maintenance Estimates</h2>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md text-center mx-auto">
            <p>Next oil change: <span className="font-bold text-black dark:text-white">500 miles</span></p>
            <p>Next tire rotation: <span className="font-bold text-black dark:text-white">2000 miles</span></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;