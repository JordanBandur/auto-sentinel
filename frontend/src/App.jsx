import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import _Header from './components/_Header';
import _Footer from './components/_Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import VehicleManagement from './pages/VehicleManagement';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Maintenance from './pages/Maintenance';

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
