import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, IconButton, TextField, Menu, MenuItem, Button, Modal, Box } from '@mui/material';
import { FormatListBulleted, GridView } from '@mui/icons-material';
import { FaUser } from 'react-icons/fa';
import Navbar from "../components/header";

const Therapists = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false); // For view modal
  const [newTherapist, setNewTherapist] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    address: '',
    contact_phone: '',
    contact_email: '',
  });

  // Fetch data from API
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/therapist/')
      .then((response) => {
        setTherapists(response.data);
      })
      .catch((err) => {
        console.error('Error fetching therapists:', err);
      });
  }, []);

  const handleViewToggle = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const handleMenuClick = (event, therapist) => {
    setAnchorEl(event.currentTarget);
    setSelectedTherapist(therapist);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setNewTherapist(selectedTherapist);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/v1/therapist/delete/${selectedTherapist.id}`)
      .then(() => {
        setTherapists(therapists.filter((therapist) => therapist.id !== selectedTherapist.id));
      })
      .catch((err) => console.error('Error deleting therapist:', err));
    handleCloseMenu();
  };

  const handleView = () => {
    setNewTherapist(selectedTherapist);
    setOpenViewModal(true);
    handleCloseMenu();
  };

  const handleCreateUpdateTherapist = () => {
    if (newTherapist.id) {
      // Update therapist
      axios
        .put(`http://localhost:8000/api/v1/therapist/update/${newTherapist.id}`, newTherapist)
        .then(() => {
          setTherapists(therapists.map((therapist) =>
            therapist.id === newTherapist.id ? newTherapist : therapist
          ));
        })
        .catch((err) => console.error('Error updating therapist:', err));
    } else {
      // Create new therapist
      axios
        .post('http://localhost:8000/api/v1/therapist/create', newTherapist)
        .then((response) => {
          setTherapists([response.data, ...therapists]);
        })
        .catch((err) => console.error('Error creating therapist:', err));
    }
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTherapist({ ...newTherapist, [name]: value });
  };

  const filteredTherapists = therapists.filter(
    (therapist) =>
      therapist.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff', color: '#00008b' }}>
        <Typography variant="h4" gutterBottom>
          Therapists
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setNewTherapist({
              first_name: '',
              last_name: '',
              specialization: '',
              address: '',
              contact_phone: '',
              contact_email: '',
            });
            setOpenModal(true);
          }}
          style={{ marginBottom: '20px' }}
        >
          Create New Therapist
        </Button>
        <TextField
          label="Search Therapists"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <IconButton onClick={handleViewToggle} style={{ marginBottom: '20px' }}>
          {view === 'grid' ? <FormatListBulleted /> : <GridView />}
        </IconButton>

        <Grid container spacing={4}>
          {filteredTherapists.map((therapist, index) => (
            view === 'grid' ? (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <FaUser size={40} style={{ color: '#00008b' }} />
                    <Typography variant="h5">{therapist.first_name} {therapist.last_name}</Typography>
                    <Typography variant="subtitle1">{therapist.specialization}</Typography>
                    <Typography variant="body2">Phone: {therapist.contact_phone}</Typography>
                    <Typography variant="body2">Email: {therapist.contact_email}</Typography>
                    <Typography variant="body2">Address: {therapist.address}</Typography>
                    <Button onClick={(e) => handleMenuClick(e, therapist)}>Actions</Button>
                  </CardContent>
                </Card>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedTherapist === therapist}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleView}>View</MenuItem>
                </Menu>
              </Grid>
            ) : (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <FaUser size={40} style={{ color: '#00008b' }} />
                    <Typography variant="h5">{therapist.first_name} {therapist.last_name}</Typography>
                    <Typography variant="subtitle1">{therapist.specialization}</Typography>
                    <Typography variant="body2">Phone: {therapist.contact_phone}</Typography>
                    <Typography variant="body2">Email: {therapist.contact_email}</Typography>
                    <Typography variant="body2">Address: {therapist.address}</Typography>
                    <Button onClick={(e) => handleMenuClick(e, therapist)}>Actions</Button>
                  </CardContent>
                </Card>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedTherapist === therapist}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleView}>View</MenuItem>
                </Menu>
              </Grid>
            )
          ))}
        </Grid>

        {/* Modal for creating or editing therapist */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ p: 4, bgcolor: 'white', maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h6">{newTherapist.id ? 'Edit Therapist' : 'Create Therapist'}</Typography>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={newTherapist.first_name}
              onChange={handleInputChange}
              name="first_name"
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={newTherapist.last_name}
              onChange={handleInputChange}
              name="last_name"
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Specialization"
              variant="outlined"
              fullWidth
              value={newTherapist.specialization}
              onChange={handleInputChange}
              name="specialization"
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={newTherapist.address}
              onChange={handleInputChange}
              name="address"
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={newTherapist.contact_phone}
              onChange={handleInputChange}
              name="contact_phone"
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={newTherapist.contact_email}
              onChange={handleInputChange}
              name="contact_email"
              style={{ marginBottom: '15px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUpdateTherapist}
            >
              {newTherapist.id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Modal>

        {/* Modal for viewing therapist details */}
        <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
          <Box sx={{ p: 4, bgcolor: 'white', maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h6">View Therapist Details</Typography>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={newTherapist.first_name}
              disabled
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={newTherapist.last_name}
              disabled
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Specialization"
              variant="outlined"
              fullWidth
              value={newTherapist.specialization}
              disabled
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={newTherapist.address}
              disabled
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={newTherapist.contact_phone}
              disabled
              style={{ marginBottom: '15px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={newTherapist.contact_email}
              disabled
              style={{ marginBottom: '15px' }}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Therapists;
