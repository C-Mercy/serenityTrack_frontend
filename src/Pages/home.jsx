import React, { useState } from 'react';
import { useFetchUserByIdQuery } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserSlash } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Navbar from "../components/header";
import RecordEpisodeWizard from "../components/episodeWizard";
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const Home = () => {
  const userInfo = sessionStorage.getItem('user');
  const loggeduser = JSON.parse(userInfo);
  const { data: user, isLoading, error } = useFetchUserByIdQuery(loggeduser.id);

  const navigate = useNavigate();
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const schoolsForAutism = [
    { name: 'Nairobi Primary School', location: 'Nairobi', hotline: '+254701234567', address: 'P.O. Box 12345, Nairobi' },
    { name: 'Mombasa Academy', location: 'Mombasa', hotline: '+254712345678', address: 'P.O. Box 67890, Mombasa' },
  ];

  const autismSpecialists = [
    { name: 'Dr. Mwangi', location: 'Nairobi', phone: '+254701234567', address: 'P.O. Box 12345, Nairobi' },
    { name: 'Dr. Akinyi', location: 'Mombasa', phone: '+254712345678', address: 'P.O. Box 67890, Mombasa' },
  ];

  const handleCreateProfile = () => {
    navigate('/create-profile');
  };

  const handleOpenWizard = (profileId) => {
    setSelectedProfileId(profileId);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setSelectedProfileId(null);
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>It's World Autism Day!</span>;
    } else {
      return (
        <Typography variant="body2">
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </Typography>
      );
    }
  };

  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`April 2, ${new Date() > new Date(`April 2, ${currentYear}`) ? currentYear + 1 : currentYear}`);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff' }}>
        <Grid container spacing={4}>
          {/* Welcome Back Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h5">Welcome Back, {loggeduser.username}</Typography>
                <FaUser size={40} />
                <Typography variant="body1">Explore your profiles and track progress.</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateProfile} style={{ marginTop: '10px' }}>
                  Create Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Countdown Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h5">Countdown to World Autism Day</Typography>
                <Typography variant="subtitle1" style={{ color: 'blue' }}>2nd April</Typography>
                <Countdown date={targetDate} renderer={countdownRenderer} />
              </CardContent>
            </Card>
          </Grid>

          {/* Profiles */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Your Profiles</Typography>
            {isLoading ? (
              <Typography>Loading profiles...</Typography>
            ) : error ? (
              <Typography>Error loading profiles.</Typography>
            ) : user && user.profiles.length > 0 ? (
              <Grid container spacing={3}>
                {user.profiles.map((profile) => (
                  <Grid item xs={12} sm={6} md={3} key={profile.id}>
                    <Card style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                      <CardContent>
                        <Typography variant="h6">{profile.first_name} {profile.last_name}</Typography>
                        <Typography variant="body2">Diagnosis Date: {profile.diagnosis_date}</Typography>
                        <Typography variant="body2">Severity: {profile.severity}</Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          style={{ marginTop: '10px' }}
                          onClick={() => handleOpenWizard(profile.id)}
                        >
                          Record Episode
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div>
                <FaUserSlash size={40} />
                <Typography>No profiles found.</Typography>
                <Button variant="contained" onClick={handleCreateProfile} style={{ marginTop: '10px' }}>
                  Add Profile
                </Button>
              </div>
            )}
          </Grid>

          {/* Schools and Therapists */}
          <Grid item xs={12}>
            <Card style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h5">Resources</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Schools for Autism</Typography>
                    {schoolsForAutism.map((school, index) => (
                      <Typography key={index} variant="body2">
                        {school.name}, {school.location} - {school.hotline}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Autism Specialists</Typography>
                    {autismSpecialists.map((specialist, index) => (
                      <Typography key={index} variant="body2">
                        {specialist.name}, {specialist.location} - {specialist.phone}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Record Episode Wizard */}
      {isWizardOpen && (
        <RecordEpisodeWizard
          profileId={selectedProfileId}
          onClose={handleCloseWizard}
        />
      )}
    </div>
  );
};

export default Home;
