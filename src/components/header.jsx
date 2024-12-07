import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogoutMutation } from '../slices/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout] = useLogoutMutation(); // Use logout mutation

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the logout mutation
      sessionStorage.removeItem('user'); // Clear session storage
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AppBar position="static" className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Toolbar className="container-fluid">
        <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
          <img src="/favicon1.ico" alt="Logo" style={{ width: "30px", height: "30px" }} />
        </IconButton>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/')}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/therapists')}>Therapists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/sessions')}>Sessions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/episodes')}>Episodes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/schools')}>Schools</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('/profiles')}>Profiles</a>
            </li>
          </ul>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
