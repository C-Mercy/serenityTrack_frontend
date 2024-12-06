import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, TextField } from '@mui/material';
import { FormatListBulleted, GridView } from '@mui/icons-material';
import { FaSchool } from 'react-icons/fa';

const schoolsData = [
  { name: 'Nairobi Primary School', location: 'Nairobi', hotline: '+254701234567', address: 'P.O. Box 12345, Nairobi' },
  { name: 'Mombasa Academy', location: 'Mombasa', hotline: '+254712345678', address: 'P.O. Box 67890, Mombasa' },
  { name: 'Kisumu High School', location: 'Kisumu', hotline: '+254723456789', address: 'P.O. Box 11223, Kisumu' },
  { name: 'Nakuru Day Secondary', location: 'Nakuru', hotline: '+254734567890', address: 'P.O. Box 44556, Nakuru' },
  // Add more schools as needed
];

const Schools = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewToggle = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const filteredSchools = schoolsData.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', color: '#00008b' }}>
      <Typography variant="h4" gutterBottom>
        Schools
      </Typography>
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
        {filteredSchools.map((school, index) => (
          view === 'grid' ? (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.location}</Typography>
                  <Typography variant="body2">Hotline: {school.hotline}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <FaSchool size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{school.name}</Typography>
                  <Typography variant="subtitle1">{school.location}</Typography>
                  <Typography variant="body2">Hotline: {school.hotline}</Typography>
                  <Typography variant="body2">Address: {school.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        ))}
      </Grid>
    </div>
  );
};

export default Schools;
