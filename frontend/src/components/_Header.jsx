import { useState } from 'react';
import { Link } from 'react-router-dom';
import './_Header';

// This state is temporary and should be updated once user auth is setup.
const _Header = () => {
  // Temporary state to simulate user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Logic to handle logout will go here
    setIsAuthenticated(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/vehicles">Vehicles</Link></li>
          <li><Link to="/maintenance">Maintenance</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {isAuthenticated ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default _Header;
