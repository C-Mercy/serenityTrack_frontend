import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, IconButton, TextField, Menu, MenuItem, Button, Modal, Box } from '@mui/material';
import { FormatListBulleted, GridView } from '@mui/icons-material';
import { FaSchool } from 'react-icons/fa';

const dummySchoolsData = [
  {
    id: 1,
    name: 'Mercy www Kiptanui',
    address: 'Alsops, Nairobi',
    contact_phone: null,
    contact_email: null,
    program_details: 'vv',
    student_capacity: 56,
    teacher_student_ratio: '34.0',
    enrollment_policies: null
  },
  {
    id: 2,
    name: 'St. Pauls Academy',
    address: 'Moi Avenue, Nairobi',
    contact_phone: '+254701234567',
    contact_email: 'info@stpaulsacademy.com',
    program_details: 'Math and Science',
    student_capacity: 200,
    teacher_student_ratio: '25.0',
    enrollment_policies: 'Open Enrollment'
  },
];

const Schools = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState(dummySchoolsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);  // For view modal
  const [newSchool, setNewSchool] = useState({
    name: '',
    address: '',
    contact_phone: '',
    contact_email: '',
    program_details: '',
    student_capacity: '',
    teacher_student_ratio: '',
    enrollment_policies: ''
  });

  // Fetch data from API or fallback to dummy data
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/school')
      .then((response) => {
        setSchools(response.data);
      })
      .catch(() => {
        setSchools(dummySchoolsData);
      });
  }, []);

  const handleViewToggle = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const handleMenuClick = (event, school) => {
    setAnchorEl(event.currentTarget);
    setSelectedSchool(school);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setNewSchool(selectedSchool);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/v1/school/delete/${selectedSchool.id}`)
      .then(() => {
        setSchools(schools.filter(school => school.id !== selectedSchool.id));
      })
      .catch(err => console.error('Error deleting school:', err));
    handleCloseMenu();
  };

  const handleView = () => {
    setNewSchool(selectedSchool);  // For viewing details
    setOpenViewModal(true);
    handleCloseMenu();
  };

  const handleCreateUpdateSchool = () => {
    if (newSchool.id) {
      // Update school
      axios.put(`http://localhost:8000/api/v1/school/update/${newSchool.id}`, newSchool)
        .then(() => {
          setSchools(schools.map(school => (school.id === newSchool.id ? newSchool : school)));
        })
        .catch(err => console.error('Error updating school:', err));
    } else {
      // Create new school
      axios.post('http://localhost:8000/api/v1/school/create', newSchool)
        .then((response) => {
          setSchools([response.data, ...schools]); // Add the new school on top of the list
        })
        .catch(err => console.error('Error creating school:', err));
    }
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool({ ...newSchool, [name]: value });
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.program_details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', color: '#00008b' }}>
      <Typography variant="h4" gutterBottom>
        Schools
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginBottom: '20px' }}>
        Create New School
      </Button>
      <TextField
        label="Search Schools"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <IconButton onClick={handleViewToggle} style={{ marginBottom: '20px' }}>
        {view === 'grid' ? <FormatListBulleted /> : <GridView />}
      </IconButton>

      <Grid container spacing={4}>
        {/* Display dummy data on top */}
        {dummySchoolsData.map((school, index) => (
          view === 'grid' ? (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.program_details}</Typography>
                  <Typography variant="body2">Capacity: {school.student_capacity}</Typography>
                  <Typography variant="body2">Teacher/Student Ratio: {school.teacher_student_ratio}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                  <Button onClick={(e) => handleMenuClick(e, school)}>Actions</Button>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.program_details}</Typography>
                  <Typography variant="body2">Capacity: {school.student_capacity}</Typography>
                  <Typography variant="body2">Teacher/Student Ratio: {school.teacher_student_ratio}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                  <Button onClick={(e) => handleMenuClick(e, school)}>Actions</Button>
                </CardContent>
              </Card>
            </Grid>
          )
        ))}

        {/* Display data from API after dummy data */}
        {filteredSchools.map((school, index) => (
          view === 'grid' ? (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.program_details}</Typography>
                  <Typography variant="body2">Capacity: {school.student_capacity}</Typography>
                  <Typography variant="body2">Teacher/Student Ratio: {school.teacher_student_ratio}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                  <Button onClick={(e) => handleMenuClick(e, school)}>Actions</Button>
                </CardContent>
              </Card>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedSchool === school}
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
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.program_details}</Typography>
                  <Typography variant="body2">Capacity: {school.student_capacity}</Typography>
                  <Typography variant="body2">Teacher/Student Ratio: {school.teacher_student_ratio}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                  <Button onClick={(e) => handleMenuClick(e, school)}>Actions</Button>
                </CardContent>
              </Card>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedSchool === school}
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

      {/* Modal for creating or editing school */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 4, bgcolor: 'white', maxWidth: 500, margin: 'auto' }}>
          <Typography variant="h6">{newSchool.id ? 'Edit School' : 'Create School'}</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newSchool.name}
            onChange={handleInputChange}
            name="name"
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={newSchool.address}
            onChange={handleInputChange}
            name="address"
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Program Details"
            variant="outlined"
            fullWidth
            value={newSchool.program_details}
            onChange={handleInputChange}
            name="program_details"
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Student Capacity"
            variant="outlined"
            fullWidth
            value={newSchool.student_capacity}
            onChange={handleInputChange}
            name="student_capacity"
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Teacher/Student Ratio"
            variant="outlined"
            fullWidth
            value={newSchool.teacher_student_ratio}
            onChange={handleInputChange}
            name="teacher_student_ratio"
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Enrollment Policies"
            variant="outlined"
            fullWidth
            value={newSchool.enrollment_policies}
            onChange={handleInputChange}
            name="enrollment_policies"
            style={{ marginBottom: '15px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateUpdateSchool}
          >
            {newSchool.id ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Modal>

      {/* Modal for viewing school details */}
      <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <Box sx={{ p: 4, bgcolor: 'white', maxWidth: 500, margin: 'auto' }}>
          <Typography variant="h6">View School Details</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newSchool.name}
            disabled
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={newSchool.address}
            disabled
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Program Details"
            variant="outlined"
            fullWidth
            value={newSchool.program_details}
            disabled
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Student Capacity"
            variant="outlined"
            fullWidth
            value={newSchool.student_capacity}
            disabled
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Teacher/Student Ratio"
            variant="outlined"
            fullWidth
            value={newSchool.teacher_student_ratio}
            disabled
            style={{ marginBottom: '15px' }}
          />
          <TextField
            label="Enrollment Policies"
            variant="outlined"
            fullWidth
            value={newSchool.enrollment_policies}
            disabled
            style={{ marginBottom: '15px' }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Schools;
