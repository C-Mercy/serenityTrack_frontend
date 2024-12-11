import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Modal, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',

    password: ''
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Fetch current user data by ID
  const fetchUserData = async () => {
    const userInfo = sessionStorage.getItem('user');
    const loggedUser = JSON.parse(userInfo);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/user/${loggedUser.id}`); // Fetch user by ID
      setUserData(response.data); // Set fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const openUpdateModal = () => {
    fetchUserData(); // Fetch user data before opening modal
    setOpenModal(true);
    handleMenuClose(); // Close menu
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/user/update/${userData.id}`, userData); // Update endpoint
      console.log('User updated successfully');
      // Optionally show a success message or redirect
      setOpenModal(false); // Close the modal after action
    } catch (error) {
      console.error('Error updating user:', error);
      // Optionally show an error message
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
              <a className="nav-link" onClick={() => navigate('/schools')}>Schools</a>
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
            <MenuItem onClick={openUpdateModal}>Update User</MenuItem> {/* Open update modal */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>

      {/* Update User Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '600px', margin: 'auto', marginTop: '100px' }}>
          <h2>Update User</h2>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.firstName}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />

          <TextField
            label="Password"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateUser} fullWidth>
            Update
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}

export default Navbar;