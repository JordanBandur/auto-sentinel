import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import _Header from './components/_Header';
import _Footer from './components/_Footer';
import { SnackbarProvider } from 'notistack';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import VehicleManagement from './views/VehicleManagement';
import Profile from './views/Profile';
import Notifications from './views/Notifications';
import Maintenance from './views/Maintenance'; 
import './assets/styles/main.scss';
import './App.scss';
import './styles/register.scss';
import './styles/login.scss';
import { AuthProvider } from './hooks/AuthContext';
import { MaintenanceProvider } from './context/MaintenanceContext';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <MaintenanceProvider> {/* Wrap your app with MaintenanceProvider */}
          <Router>
            <div className="App">
              <_Header />
              <main>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/vehicles" element={<VehicleManagement />} />
                  <Route path="/maintenance" element={<Maintenance />} /> {/* This stays the same */}
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <_Footer />
            </div>
          </Router>
        </MaintenanceProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
