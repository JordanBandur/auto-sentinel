import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../assets/styles/components/_Footer.scss';

const Footer = () => {
  return (
    <AppBar position="static" className="footer-app-bar">
      <Toolbar className="footer-toolbar">
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="body1" className="footer-text">
            &copy; 2024 Auto Sentinel. All rights reserved.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
