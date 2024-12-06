import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, TextField, Button } from '@mui/material';
import { Therapist, FormatListBulleted, GridView } from '@mui/icons-material';
import { FaUserMd } from 'react-icons/fa';

const therapistsData = [
  { name: 'Dr. Mwangi', location: 'Nairobi', phone: '+254701234567', address: 'P.O. Box 12345, Nairobi' },
  { name: 'Dr. Akinyi', location: 'Mombasa', phone: '+254712345678', address: 'P.O. Box 67890, Mombasa' },
  { name: 'Dr. Otieno', location: 'Kisumu', phone: '+254723456789', address: 'P.O. Box 11223, Kisumu' },
  { name: 'Dr. Wambui', location: 'Nakuru', phone: '+254734567890', address: 'P.O. Box 44556, Nakuru' },
  // Add more therapists as needed
];


const Therapists = () => {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewToggle = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const filteredTherapists = therapistsData.filter(
    (therapist) =>
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', color: '#00008b' }}>
      <Typography variant="h4" gutterBottom>
        Therapists
      </Typography>
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
                  <FaUserMd size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{therapist.name}</Typography>
                  <Typography variant="subtitle1">{therapist.location}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <FaUserMd size={40} style={{ color: '#00008b' }} />
                  <Typography variant="h5">{therapist.name}</Typography>
                  <Typography variant="subtitle1">{therapist.location}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        ))}
      </Grid>
    </div>
  );
};

export default Therapists;
