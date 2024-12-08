import React, { useState } from 'react';
import { useFetchUserByIdQuery } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUserSlash } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Navbar from "../components/header";
import RecordEpisode from "../components/episodeWizard";
import CreateProfile from "../components/createProfile";
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Link } from "react-router-dom";

// Dummy Data for Schools and Therapists
const dummySchools = [
  { id: 1, name: "Sunshine Autism Center", location: "New York" },
  { id: 2, name: "Blue Horizon Academy", location: "San Francisco" },
];

const dummyTherapists = [
  { id: 1, name: "Dr. Jane Doe", specialization: "Speech Therapy" },
  { id: 2, name: "Mr. John Smith", specialization: "Behavioral Therapy" },
];

const Home = () => {
  const userInfo = sessionStorage.getItem('user');
  const loggeduser = JSON.parse(userInfo);
  console.log(loggeduser,"jj")
  const { data: user, isLoading, error } = useFetchUserByIdQuery(loggeduser.id);

  const navigate = useNavigate();
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  // Modal handlers
  const handleOpenWizard = (profileId) => {
    setSelectedProfileId(profileId);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setSelectedProfileId(null);
  };

  const handleOpenCreateProfile = () => {
    setCurrentProfile(null); // Reset for creating a new profile
    setIsCreateProfileOpen(true);
  };

  const handleEditProfile = (profile) => {
    setCurrentProfile(profile); // Set the profile for editing
    setIsCreateProfileOpen(true);
  };

  const handleCloseCreateProfile = () => {
    setIsCreateProfileOpen(false);
    setCurrentProfile(null); // Reset after closing
  };

  // Countdown renderer for World Autism Day
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>It's World Autism Day!</span>;
    }
    return (
      <Typography variant="body2">
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </Typography>
    );
  };

  const currentYear = new Date().getFullYear();
  const targetDate = new Date(
    `April 2, ${
      new Date() > new Date(`April 2, ${currentYear}`) ? currentYear + 1 : currentYear
    }`
  );

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', backgroundColor: '#f0f8ff' }}>
        <Grid container spacing={4}>
          {/* Welcome Back Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', height: '100%' }}>
              <CardContent>
                <Typography variant="h5">Welcome Back, {loggeduser.username}</Typography>
                <FaUser size={40} />
                <Typography variant="body1">Explore your profiles and track progress.</Typography>
                <div style={{ marginTop: '10px' }}>
                  <Button variant="contained" color="primary" onClick={handleOpenCreateProfile}>
                    Create Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Countdown Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', height: '100%' }}>
              <CardContent>
                <Typography variant="h5">Countdown to World Autism Day</Typography>
                <Typography variant="subtitle1" style={{ color: 'blue' }}>2nd April</Typography>
                <Countdown date={targetDate} renderer={countdownRenderer} />
              </CardContent>
            </Card>
          </Grid>

          {/* Profiles Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Your Profiles</Typography>
            {isLoading ? (
              <Typography>Loading profiles...</Typography>
            ) : error ? (
              <Typography>Error loading profiles.</Typography>
            ) : user && user.profiles.length > 0 ? (
              <Grid container spacing={3}>
                {user.profiles.map((profile) => (
                  <Grid item xs={12} sm={6} md={4} key={profile.id}>
                    <Card style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                      <CardContent>
                        <Typography variant="h6">
                          {profile.first_name} {profile.last_name}
                        </Typography>
                        <Typography variant="body2">Diagnosis Date: {profile.diagnosis_date}</Typography>
                        <Typography variant="body2">Severity: {profile.severity}</Typography>

                        {/* Button to record an episode */}
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          style={{ marginTop: '10px', marginRight: '10px' }}
                          onClick={() => handleOpenWizard(profile.id)}
                        >
                          Record a Tantrum
                        </Button>

                        {/* Button to view profile details */}
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginTop: '10px', marginRight: '10px' }}
                          component={Link}
                          to={`/profile/${profile.id}`}
                        >
                          View Details
                        </Button>

                        {/* Button to edit the profile */}
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginTop: '10px' }}
                          onClick={() => handleEditProfile(profile)}
                        >
                          Edit Profile
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
              </div>
            )}
          </Grid>

          {/* Schools Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Schools</Typography>
            <Grid container spacing={3}>
              {dummySchools.slice(0, 2).map((school) => (
                <Grid item xs={12} sm={6} md={4} key={school.id}>
                  <Card style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6">{school.name}</Typography>
                      <Typography variant="body2">{school.location}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button variant="text" color="primary" style={{ marginTop: '10px' }} onClick={() => navigate('/schools')}>
              Read More
            </Button>
          </Grid>

          {/* Therapists Section */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Therapists</Typography>
            <Grid container spacing={3}>
              {dummyTherapists.slice(0, 2).map((therapist) => (
                <Grid item xs={12} sm={6} md={4} key={therapist.id}>
                  <Card style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                      <Typography variant="h6">{therapist.name}</Typography>
                      <Typography variant="body2">{therapist.specialization}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button variant="text" color="primary" style={{ marginTop: '10px' }} onClick={() => navigate('/therapists')}>
              Read More
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* Record Episode Wizard Modal */}
      {isWizardOpen && (
        <RecordEpisode
          open={isWizardOpen}
          onClose={handleCloseWizard}
          profileId={selectedProfileId}
        />
      )}

      {/* Create Profile Modal */}
      {loggeduser && (
          <CreateProfile isOpen={isCreateProfileOpen} onClose={handleCloseCreateProfile}
                         userId={loggeduser.id}
        profile={currentProfile} /> )}


    </div>
  );
};

export default Home;
