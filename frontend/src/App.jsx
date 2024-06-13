import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/_Header';
import Footer from './components/_Footer';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import VehicleManagement from './views/VehicleManagement';
import Profile from './views/Profile';
import Notifications from './views/Notifications';
import Maintenance from './views/Maintenance';
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="App bg-gray-900 text-white dark:bg-gray-900 dark:text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vehicles" element={<VehicleManagement />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;