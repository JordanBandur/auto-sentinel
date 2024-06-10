import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import _Header from './components/_Header';
import _Footer from './components/_Footer';
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
      <div className="App">
        <_Header />
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
        <_Footer />
      </div>
    </Router>
  );
};

export default App;
