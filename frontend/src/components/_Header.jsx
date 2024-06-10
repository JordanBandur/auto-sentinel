import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import '../assets/styles/components/_Header.scss';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={NavLink} to="/" className="nav-link">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/vehicles" className="nav-link">
          <ListItemText primary="Vehicles" />
        </ListItem>
        <ListItem button component={NavLink} to="/maintenance" className="nav-link">
          <ListItemText primary="Maintenance" />
        </ListItem>
        <ListItem button component={NavLink} to="/notifications" className="nav-link">
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
    <AppBar position="static" className="header-app-bar">
      <Toolbar className="header-toolbar">
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" className="header-title">
            Auto Sentinel
          </Typography>
          <Hidden smDown>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <List component="nav" sx={{ display: 'flex' }}>
                <ListItem button component={NavLink} to="/" className="nav-link">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={NavLink} to="/vehicles" className="nav-link">
                  <ListItemText primary="Vehicles" />
                </ListItem>
                <ListItem button component={NavLink} to="/maintenance" className="nav-link">
                  <ListItemText primary="Maintenance" />
                </ListItem>
                <ListItem button component={NavLink} to="/notifications" className="nav-link">
                  <ListItemText primary="Notifications" />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ display: 'flex' }}>
              {isAuthenticated ? (
                <Button className="auth-button" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="contained" className="register-button" component={Link} to="/register">
                    Register
                  </Button>
                  <Button variant="contained" className="login-button" component={Link} to="/login">
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
