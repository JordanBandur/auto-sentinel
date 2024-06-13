import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../assets/styles/components/_Header.scss';

const Header = () => {
  // Set darkMode to true by default
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={NavLink} to="/" className="nav-link text-gray-800 dark:text-gray-100">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/vehicles" className="nav-link text-gray-800 dark:text-gray-100">
          <ListItemText primary="Vehicles" />
        </ListItem>
        <ListItem button component={NavLink} to="/maintenance" className="nav-link text-gray-800 dark:text-gray-100">
          <ListItemText primary="Maintenance" />
        </ListItem>
        <ListItem button component={NavLink} to="/notifications" className="nav-link text-gray-800 dark:text-gray-100">
          <ListItemText primary="Notifications" />
        </ListItem>
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={NavLink} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
            <ListItem button component={NavLink} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" className="header-app-bar bg-gray-100 dark:bg-gray-800">
      <Toolbar className="header-toolbar">
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" className="header-title text-white">
            Auto Sentinel
          </Typography>
          <Hidden smDown>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <List component="nav" sx={{ display: 'flex' }}>
                <ListItem button component={NavLink} to="/" className="nav-link text-gray-800 dark:text-gray-100">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={NavLink} to="/vehicles" className="nav-link text-gray-800 dark:text-gray-100">
                  <ListItemText primary="Vehicles" />
                </ListItem>
                <ListItem button component={NavLink} to="/maintenance" className="nav-link text-gray-800 dark:text-gray-100">
                  <ListItemText primary="Maintenance" />
                </ListItem>
                <ListItem button component={NavLink} to="/notifications" className="nav-link text-gray-800 dark:text-gray-100">
                  <ListItemText primary="Notifications" />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleToggle} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {isAuthenticated ? (
                <Button className="auth-button text-gray-800 dark:text-gray-100" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="contained" className="register-button ml-4 bg-custom-green text-white" component={Link} to="/register">
                    Register
                  </Button>
                  <Button variant="contained" className="login-button ml-2 bg-custom-green text-white" component={Link} to="/login">
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Hidden>
          <Hidden smUp>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;